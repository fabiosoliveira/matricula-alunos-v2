import restify, { Request, Response, Next } from 'restify'
import Aluno, { AlunoInterface } from './Aluno'
import ModelController from '../common/ModelController'
import model from '../common/modelTransactions'
import { ClientSession } from 'mongodb'
import Endereco from '../Endereco/Endereco'
import { NotFoundError } from 'restify-errors'

class AlunoController extends ModelController<AlunoInterface> {
  public constructor() {
    super(Aluno)
  }

  private saveAluno = (req: Request, res: Response, next: Next): void => {
    model.withTransaction(async (session: ClientSession): Promise<AlunoInterface[]> => {
      const resp = await this._model.create([req.body], { session })

      await Endereco.findByIdAndUpdate(resp[0].endereco.id,
        { $push: { referencias: resp[0]._id } },
        { upsert: true }).session(session)

      return resp
    })
      .then((result): void => {
        res.send({ ...result })
      })
      .catch((err): void => {
        console.log(err)
        next(err)
      })
  }

  private replaceAluno = (req: Request, res: Response, next: Next): void => {
    model.withTransaction(async (session: ClientSession): Promise<AlunoInterface[]> => {
      const resp = await this._model.replaceOne({ _id: req.params.id }, req.body).session(session)

      let aluno: AlunoInterface
      if (resp.n) {
        aluno = await this._model.findById(req.params.id).session(session)
      } else {
        throw new NotFoundError('Document not found')
      }

      await Endereco.findByIdAndUpdate(aluno.endereco.id,
        { $push: { referencias: aluno._id } },
        { upsert: true }).session(session)

      return [aluno]
    })
      .then((result): void => {
        res.send({ ...result })
      })
      .catch((err): void => {
        console.log(err)
        next(err)
      })
  }

  private deleteAluno = (req: Request, res: Response, next: Next): void => {
    model.withTransaction(async (session: ClientSession): Promise<AlunoInterface[]> => {
      const aluno = await this._model.findById(req.params.id).session(session)

      const resp = await this._model.deleteOne({ _id: req.params.id }).session(session)

      if (!resp.n) throw new NotFoundError('Document not found')

      await Endereco.findByIdAndUpdate(aluno.endereco.id,
        { $pull: { referencias: aluno._id } },
        { upsert: true }).session(session)

      return [aluno]
    })
      .then((): void => {
        res.send(204)
      })
      .catch((err): void => {
        console.log(err)
        next(err)
      })
  }

  public applyRoutes(application: restify.Server): void {
    application.get(this.basePath, [this.auth, this.findAll])
    application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, this.saveAluno)
    application.put(`${this.basePath}/:id`, this.replaceAluno)
    application.del(`${this.basePath}/:id`, this.deleteAluno)
    application.patch(`${this.basePath}/:id`, this.update)
  }
}

export default new AlunoController()
