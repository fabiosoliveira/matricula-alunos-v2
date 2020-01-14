"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _Aluno = require('./Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _ModelController = require('../common/ModelController'); var _ModelController2 = _interopRequireDefault(_ModelController);
var _modelTransactions = require('../common/modelTransactions'); var _modelTransactions2 = _interopRequireDefault(_modelTransactions);

var _Endereco = require('../Endereco/Endereco'); var _Endereco2 = _interopRequireDefault(_Endereco);
var _restifyerrors = require('restify-errors');

class AlunoController extends _ModelController2.default {
   constructor () {
    super(_Aluno2.default);AlunoController.prototype.__init.call(this);AlunoController.prototype.__init2.call(this);AlunoController.prototype.__init3.call(this);
  }

   __init() {this.saveAluno = (req, res, next) => {
    _modelTransactions2.default.withTransaction(async (session) => {
      const resp = await this._model.create([req.body], { session })

      await _Endereco2.default.findByIdAndUpdate(resp[0].endereco.id,
        { $push: { referencias: resp[0]._id } },
        { upsert: true }).session(session)

      return resp
    })
      .then((result) => {
        res.send({ ...result })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }}

   __init2() {this.replaceAluno = (req, res, next) => {
    _modelTransactions2.default.withTransaction(async (session) => {
      const resp = await this._model.replaceOne({ _id: req.params.id }, req.body).session(session)

      let aluno
      if (resp.n) {
        aluno = await this._model.findById(req.params.id).session(session)
      } else {
        throw new (0, _restifyerrors.NotFoundError)('Document not found')
      }

      await _Endereco2.default.findByIdAndUpdate(aluno.endereco.id,
        { $push: { referencias: aluno._id } },
        { upsert: true }).session(session)

      return [aluno]
    })
      .then((result) => {
        res.send({ ...result })
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }}

   __init3() {this.deleteAluno = (req, res, next) => {
    _modelTransactions2.default.withTransaction(async (session) => {
      const aluno = await this._model.findById(req.params.id).session(session)

      const resp = await this._model.deleteOne({ _id: req.params.id }).session(session)

      if (!resp.n) throw new (0, _restifyerrors.NotFoundError)('Document not found')

      await _Endereco2.default.findByIdAndUpdate(aluno.endereco.id,
        { $pull: { referencias: aluno._id } },
        { upsert: true }).session(session)

      return [aluno]
    })
      .then(() => {
        res.send(204)
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  }}

   applyRoutes (application) {
    application.get(this.basePath, this.findAll)
    application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, this.saveAluno)
    application.put(`${this.basePath}/:id`, this.replaceAluno)
    application.del(`${this.basePath}/:id`, this.deleteAluno)
    application.patch(`${this.basePath}/:id`, this.update)
  }
}

exports. default = new AlunoController()
