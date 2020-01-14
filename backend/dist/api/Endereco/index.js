"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _Endereco = require('./Endereco'); var _Endereco2 = _interopRequireDefault(_Endereco);
var _ModelController = require('../common/ModelController'); var _ModelController2 = _interopRequireDefault(_ModelController);

class EnderecoController extends _ModelController2.default {
   constructor () {
    super(_Endereco2.default);EnderecoController.prototype.__init.call(this);
  }

   __init() {this.createEndereco = (req, res, next) => {
    const criarEndereco = ({ rua, bairro, cidade }) => `${rua}, ${bairro}, ${cidade}`
    const endereco = req.body
    endereco.endereco = criarEndereco(endereco)
    return next()
  }}

   applyRoutes (application) {
    application.get(this.basePath, this.findAll)
    application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, [this.createEndereco, this.save])
    application.put(`${this.basePath}/:id`, [this.createEndereco, this.replace])
    application.patch(`${this.basePath}/:id`, [this.update])
    application.del(`${this.basePath}/:id`, this.delete)
  }
}

exports. default = new EnderecoController()
