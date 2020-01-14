"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Aluno = require('../Aluno/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Turma = require('../Turma/Turma'); var _Turma2 = _interopRequireDefault(_Turma);
var _restifyerrors = require('restify-errors');
var _app = require('../../config/app'); var _app2 = _interopRequireDefault(_app);
var _lodash = require('lodash'); var _lodash2 = _interopRequireDefault(_lodash);

class Model {constructor() { Model.prototype.__init.call(this);Model.prototype.__init2.call(this);Model.prototype.__init3.call(this); }
  // private app: App

  // public constructor (app: App) {
  //   this.app = app
  // }

  // private startSession (): Promise<ClientSession> {
  //   return this.app.startSession()
  // }

     __init() {this.updateAlunoStatus = async (alunos, session, status) => {
      const arrayAlunos = alunos.map(async (element) => {
        const resp = await _Aluno2.default.updateOne(
          { _id: element },
          { status },
          { session }
        )
        return resp.ok
      })

      const promiseArrayAlunos = await Promise.all(arrayAlunos)
      const reduceSum = (acumulator, atual) => acumulator + atual
      const total = await promiseArrayAlunos.reduce(reduceSum)
      const statusChanged = await (total === arrayAlunos.length)

      if (!statusChanged) throw new (0, _restifyerrors.InternalError)('Erro ao mudar status para ' + status)
    }}

     __init2() {this.updateAluno = async (turma, session, method) => {
      const alunoReduceId = (aluno) => aluno.aluno.toString()

      let alunosUnchangedMapedId
      if (method !== 'post') {
        const turmaUnchanged = await _Turma2.default.findById(turma._id).session(session)
        const alunosUnchanged = turmaUnchanged.alunos

        alunosUnchangedMapedId = Array.from(alunosUnchanged.map(alunoReduceId))

        if (method === 'delete') {
          await this.updateAlunoStatus(alunosUnchangedMapedId, session, 'ATIVO')
          return
        }
      }

      let alunosChangedMapedId
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
      const alunosForAdd = _lodash2.default.difference(alunosChangedMapedId, alunosUnchangedMapedId)

      if (alunosForAdd.length) {
        await this.updateAlunoStatus(alunosForAdd, session, 'MATRICULADO')
      }

      // const alunosForRemove = alunosUnchangedMapedId.filter((value: string):boolean => {
      //   return !alunosChangedMapedId.includes(value)
      // })
      const alunosForRemove = _lodash2.default.difference(alunosUnchangedMapedId, alunosChangedMapedId)

      if (alunosForRemove.length) {
        await this.updateAlunoStatus(alunosForRemove, session, 'ATIVO')
      }
    }}

     __init3() {this.withTransaction = async (callback) => {
      const session = await _app2.default.startSession()
      session.startTransaction()

      try {
        const response = await callback(session)

        session.commitTransaction()
        return response
      } catch (error) {
        session.abortTransaction()
        throw error
      }
    }}
}

exports. default = new Model()
