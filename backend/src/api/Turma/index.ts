import { ClientSession } from 'mongodb'
import restify, { Request, Response, Next } from 'restify'
import { NotFoundError, InvalidContentError } from 'restify-errors'
import _ from 'lodash'
import Turma, { TurmaInterface, AlunoResumoInterface } from './Turma'
import ModelController from '../common/ModelController'
import model from '../common/modelTransactions'

class TurmaController extends ModelController<TurmaInterface> {
  public constructor () {
    super(Turma)
  }

  private criarNomeTurma = (req: Request, res: Response, next: Next): void => {
    const criarNomeTurma = ({ ano, tipo, serie, turma }): string => {
      return `${ano}${tipo.substring(1, 0)}${serie}${turma}`
    }

    const turma: TurmaInterface = req.body
    turma.nome = criarNomeTurma(turma)
    return next()
  }

  private verifyAlunosIsEmpty = (req: Request, res: Response, next: Next): void => {
    const turma: TurmaInterface = req.body
    turma.alunos = turma.alunos.filter((value: AlunoResumoInterface):boolean => {
      return !_.isEmpty(value)
    })

    if (!turma.alunos.length) {
      return next(new InvalidContentError('Não pode turma vazia'))
    }
    return next()
  }

  // put
  private replaceWithStatus = (req: Request, res: Response, next: Next): void => {
    const turma: TurmaInterface = req.body
    // const model = new Model(app)
    model.withTransaction(async (session: ClientSession): Promise<TurmaInterface[]> => {
      await model.updateAluno(turma, session, 'put')
      const result = await this._model.replaceOne({ _id: req.params.id }, turma).session(session)

      if (!result.n) throw new NotFoundError('Document not found')
      const turmaFound = await this._model.findById(req.params.id)
      return [turmaFound]
    })
      .then((turma): void => {
        res.send({ ...turma })
      })
      .catch((err):void => {
        console.log(err)
        next(err)
      })
  }

  // post
  private createWithStatus = (req: Request, res: Response, next: Next): void => {
    const turma: TurmaInterface = req.body
    // const model = new Model(app)
    model.withTransaction(async (session: ClientSession): Promise<TurmaInterface[]> => {
      await model.updateAluno(turma, session, 'post')
      return this._model.create([turma], { session })
    })
      .then((turma): void => {
        res.send({ ...turma })
      })
      .catch((err):void => {
        console.log(err)
        next(err)
      })
  }

  // del
  private deleteWithStatus = (req: Request, res: Response, next: Next): void => {
    // const model = new Model(app)
    const turma = new Turma()
    turma._id = req.params.id
    model.withTransaction(async (session: ClientSession): Promise<any> => {
      await model.updateAluno(turma, session, 'delete')
      return this._model.deleteOne({ _id: turma._id }).session(session)
    })
      .then((cmdResult): void => {
        if (cmdResult.n) {
          res.send(204)
        } else {
          throw new NotFoundError('Document not found')
        }
      })
      .catch((err):void => {
        console.log(err)
        next(err)
      })
  }

  public applyRoutes (application: restify.Server): void {
    application.get(this.basePath, this.findAll)
    application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, [
      this.verifyAlunosIsEmpty, this.criarNomeTurma, this.createWithStatus
    ])
    application.put(`${this.basePath}/:id`, [
      this.verifyAlunosIsEmpty, this.criarNomeTurma, this.replaceWithStatus
    ])
    application.del(`${this.basePath}/:id`, this.deleteWithStatus)
  }
}

export default new TurmaController()
