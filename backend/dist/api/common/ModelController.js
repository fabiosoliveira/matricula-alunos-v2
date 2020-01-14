"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _restifyerrors = require('restify-errors');

 class ModelController {
  

  
  

   constructor (model) {;ModelController.prototype.__init.call(this);ModelController.prototype.__init2.call(this);ModelController.prototype.__init3.call(this);ModelController.prototype.__init4.call(this);ModelController.prototype.__init5.call(this);ModelController.prototype.__init6.call(this);
    this._model = model
    this._basePath = `/api/${this._model.collection.name}`
  }

   get basePath () {
    return this._basePath
  }

   filter (req) {
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

   envelopData (data, count) {
    return {
      meta: {
        count
      },
      items: data
    }
  }

  // get
   __init() {this.findAll = (req, res, next) => {
    const { select, sort } = req.query

    const limit = parseInt(req.query.limit)
    let page = parseInt(req.query.page || 1)
    page = page > 0 ? page : 1

    const skip = (page - 1) * limit

    const conditions = this.filter(req)

    const options = { limit, skip, sort }

    this._model.find(conditions, select, options)
      .then(async (data) => {
        const result = await this._model.countDocuments(conditions)
        return this.envelopData(data, result)
      })
      .then((data) => {
        res.send(data)
      })
      .catch(next)
  }}

  // get
   __init2() {this.findById = (req, res, next) => {
    this._model.findById(req.params.id)
      .then((document) => {
        if (document) {
          res.send(document)
        } else {
          throw new (0, _restifyerrors.NotFoundError)('Document not found')
        }
      })
      .catch(next)
  }}

  // post
   __init3() {this.save = (req, res, next) => {
    this._model.create(req.body)
      .then((result) => {
        res.send({ ...result })
      })
      .catch(next)
  }}

  // put
   __init4() {this.replace = (req, res, next) => {
    this._model.replaceOne({ _id: req.params.id }, req.body)
      .then((result) => {
        if (result.n) {
          return this._model.findById(req.params.id)
        } else {
          throw new (0, _restifyerrors.NotFoundError)('Document not found')
        }
      })
      .then((result) => {
        res.send({ ...result })
      })
      .catch(next)
  }}

  // patch
   __init5() {this.update = (req, res, next) => {
    const options = { runValidators: true, new: true }
    this._model.findByIdAndUpdate(req.params.id, req.body, options)
      .then((result) => {
        res.send({ ...result })
      })
      .catch(next)
  }}

  // del
   __init6() {this.delete = (req, res, next) => {
    this._model.deleteOne({ _id: req.params.id })
      .then((cmdResult) => {
        if (cmdResult.n) {
          res.send(204)
        } else {
          throw new (0, _restifyerrors.NotFoundError)('Document not found')
        }
      })
      .catch(next)
  }}
}

exports. default = ModelController
