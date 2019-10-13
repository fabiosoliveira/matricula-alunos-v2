import mongoose, { DocumentQuery } from 'mongoose'
import restify, { Request, Response, Next } from 'restify'
import { NotFoundError } from 'restify-errors'

abstract class ModelController<T extends mongoose.Document> {
  abstract applyRoutes(routes: restify.Server): void

  protected _model: mongoose.Model<T>
  private _basePath: string

  protected constructor (model: mongoose.Model<T>) {
    this._model = model
    this._basePath = `/api/${this._model.collection.name}`
  }

  protected get basePath (): string {
    return this._basePath
  }

  private filter (req: Request): any {
    let conditions = {}

    for (const key in req.query) {
      if (key.includes('__')) {
        const [field, filter] = key.split('__')
        switch (filter) {
          case 'regex':
            const regexp = req.query[key].split('/')
            conditions[field] = new RegExp(regexp[1], regexp[2])
            break
          // note enquals
          case 'ne':
            conditions[field] = { $ne: req.query[key] }
            break
          case 'equals':
            conditions[field] = req.query[key]
            break
        }
      }
    }
    return conditions
  }

  private envelopData (data: T[], count: number): any {
    return {
      meta: {
        count
      },
      items: data
    }
  }

  // get
  protected findAll = (req: Request, res: Response, next: Next): void => {
    const { select, sort } = req.query

    const limit = parseInt(req.query.limit)
    let page = parseInt(req.query.page || 1)
    page = page > 0 ? page : 1

    const skip = (page - 1) * limit

    const conditions = this.filter(req)

    const options = { limit, skip, sort }

    this._model.find(conditions, select, options)
      .then(async (data): Promise<void> => {
        const result = await this._model.countDocuments(conditions)
        return this.envelopData(data, result)
      })
      .then((data): void => {
        res.send(data)
      })
      .catch(next)
  }

  // get
  protected findById = (req: Request, res: Response, next: Next): void => {
    this._model.findById(req.params.id)
      .then((document): void => {
        if (document) {
          res.send(document)
        } else {
          throw new NotFoundError('Document not found')
        }
      })
      .catch(next)
  }

  // post
  protected save = (req: Request, res: Response, next: Next): void => {
    this._model.create(req.body)
      .then((result): void => {
        res.send({ ...result })
      })
      .catch(next)
  }

  // put
  protected replace = (req: Request, res: Response, next: Next): void => {
    this._model.replaceOne({ _id: req.params.id }, req.body)
      .then((result): DocumentQuery<T, T, {}> => {
        if (result.n) {
          return this._model.findById(req.params.id)
        } else {
          throw new NotFoundError('Document not found')
        }
      })
      .then((result): void => {
        res.send({ ...result })
      })
      .catch(next)
  }

  // patch
  protected update = (req: Request, res: Response, next: Next): void => {
    const options = { runValidators: true, new: true }
    this._model.findByIdAndUpdate(req.params.id, req.body, options)
      .then((result): void => {
        res.send({ ...result })
      })
      .catch(next)
  }

  // del
  protected delete = (req: Request, res: Response, next: Next): void => {
    this._model.deleteOne({ _id: req.params.id })
      .then((cmdResult): void => {
        if (cmdResult.n) {
          res.send(204)
        } else {
          throw new NotFoundError('Document not found')
        }
      })
      .catch(next)
  }
}

export default ModelController
