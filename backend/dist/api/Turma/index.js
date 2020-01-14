"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _restifyerrors = require('restify-errors');
var _lodash = require('lodash'); var _lodash2 = _interopRequireDefault(_lodash);
var _Turma = require('./Turma'); var _Turma2 = _interopRequireDefault(_Turma);
var _ModelController = require('../common/ModelController'); var _ModelController2 = _interopRequireDefault(_ModelController);
var _modelTransactions = require('../common/modelTransactions'); var _modelTransactions2 = _interopRequireDefault(_modelTransactions);

class TurmaController extends _ModelController2.default {
   constructor () {
    super(_Turma2.default);TurmaController.prototype.__init.call(this);TurmaController.prototype.__init2.call(this);TurmaController.prototype.__init3.call(this);TurmaController.prototype.__init4.call(this);TurmaController.prototype.__init5.call(this);
  }

   __init() {this.criarNomeTurma = (req, res, next) => {
    const criarNomeTurma = ({ ano, tipo, serie, turma }) => {
      return `${ano}${tipo.substring(1, 0)}${serie}${turma}`
    }

    const turma = req.body
    turma.nome = criarNomeTurma(turma)
    return next()
  }}

   __init2() {this.verifyAlunosIsEmpty = (req, res, next) => {
    const turma = req.body
    turma.alunos = turma.alunos.filter((value) => {
      return !_lodash2.default.isEmpty(value)
    })

    if (!turma.alunos.length) {
      return next(new (0, _restifyerrors.InvalidContentError)('Não pode turma vazia'))
    }
    return next()
  }}

  // put
   __init3() {this.replaceWithStatus = (req, res, next) => {
    const turma = req.body
    // const model = new Model(app)
    _modelTransactions2.default.withTransaction(async (session) => {
      await _modelTransactions2.default.updateAluno(turma, session, 'put')
      const result = await this._model.replaceOne({ _id: req.params.id }, turma).session(session)

      if (!result.n) throw new (0, _restifyerrors.NotFoundError)('Document not found')
      const turmaFound = await this._model.findById(req.params.id)
      return [turmaFound]
    })
      .then((turma) => {
        res.send({ ...turma })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }}

  // post
   __init4() {this.createWithStatus = (req, res, next) => {
    const turma = req.body
    // const model = new Model(app)
    _modelTransactions2.default.withTransaction(async (session) => {
      await _modelTransactions2.default.updateAluno(turma, session, 'post')
      return this._model.create([turma], { session })
    })
      .then((turma) => {
        res.send({ ...turma })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }}

  // del
   __init5() {this.deleteWithStatus = (req, res, next) => {
    // const model = new Model(app)
    const turma = new (0, _Turma2.default)()
    turma._id = req.params.id
    _modelTransactions2.default.withTransaction(async (session) => {
      await _modelTransactions2.default.updateAluno(turma, session, 'delete')
      return this._model.deleteOne({ _id: turma._id }).session(session)
    })
      .then((cmdResult) => {
        if (cmdResult.n) {
          res.send(204)
        } else {
          throw new (0, _restifyerrors.NotFoundError)('Document not found')
        }
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }}

   applyRoutes (application) {
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

exports. default = new TurmaController()
