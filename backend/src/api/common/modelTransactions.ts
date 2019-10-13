import { ClientSession } from 'mongodb'
import Aluno from '../Aluno/Aluno'
import Turma, { AlunoResumoInterface, TurmaInterface } from '../Turma/Turma'
import { InternalError } from 'restify-errors'
import app, { App } from '../../config/app'
import _ from 'lodash'

class Model {
  // private app: App

  // public constructor (app: App) {
  //   this.app = app
  // }

  // private startSession (): Promise<ClientSession> {
  //   return this.app.startSession()
  // }

    private updateAlunoStatus = async (alunos: string[], session: ClientSession, status: string): Promise<void> => {
      const arrayAlunos = alunos.map(async (element): Promise<number> => {
        const resp = await Aluno.updateOne(
          { _id: element },
          { status },
          { session }
        )
        return resp.ok
      })

      const promiseArrayAlunos = await Promise.all(arrayAlunos)
      const reduceSum = (acumulator: number, atual: number): number => acumulator + atual
      const total = await promiseArrayAlunos.reduce(reduceSum)
      const statusChanged = await (total === arrayAlunos.length)

      if (!statusChanged) throw new InternalError('Erro ao mudar status para ' + status)
    }

    public updateAluno = async (turma: TurmaInterface, session: ClientSession, method: string): Promise<void> => {
      const alunoReduceId = (aluno: AlunoResumoInterface): string => aluno.aluno.toString()

      let alunosUnchangedMapedId: string[]
      if (method !== 'post') {
        const turmaUnchanged = await Turma.findById(turma._id).session(session)
        const alunosUnchanged = turmaUnchanged.alunos

        alunosUnchangedMapedId = Array.from(alunosUnchanged.map(alunoReduceId))

        if (method === 'delete') {
          await this.updateAlunoStatus(alunosUnchangedMapedId, session, 'ATIVO')
          return
        }
      }

      let alunosChangedMapedId: string[]
      if (method !== 'delete') {
        const alunosChanged = turma.alunos

        alunosChangedMapedId = alunosChanged.map(alunoReduceId)

        if (method === 'post') {
          await this.updateAlunoStatus(alunosChangedMapedId, session, 'MATRICULADO')
          return
        }
      }

      // const alunosForAdd = alunosChangedMapedId.filter((value: string):boolean => {
      //   return !alunosUnchangedMapedId.includes(value)
      // })
      const alunosForAdd = _.difference(alunosChangedMapedId, alunosUnchangedMapedId)

      if (alunosForAdd.length) {
        await this.updateAlunoStatus(alunosForAdd, session, 'MATRICULADO')
      }

      // const alunosForRemove = alunosUnchangedMapedId.filter((value: string):boolean => {
      //   return !alunosChangedMapedId.includes(value)
      // })
      const alunosForRemove = _.difference(alunosUnchangedMapedId, alunosChangedMapedId)

      if (alunosForRemove.length) {
        await this.updateAlunoStatus(alunosForRemove, session, 'ATIVO')
      }
    }

    public withTransaction = async (callback: (session: ClientSession)=>Promise<any>): Promise<any> => {
      const session = await app.startSession()
      session.startTransaction()

      try {
        const response = await callback(session)

        session.commitTransaction()
        return response
      } catch (error) {
        session.abortTransaction()
        throw error
      }
    }
}

export default new Model()
