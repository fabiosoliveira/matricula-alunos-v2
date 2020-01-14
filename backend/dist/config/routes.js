"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _Turma = require('../api/Turma'); var _Turma2 = _interopRequireDefault(_Turma);
var _Aluno = require('../api/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Endereco = require('../api/Endereco'); var _Endereco2 = _interopRequireDefault(_Endereco);
var _Foto = require('../api/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

function routes (application) {
  _Turma2.default.applyRoutes(application)
  _Aluno2.default.applyRoutes(application)
  _Endereco2.default.applyRoutes(application)
  _Foto2.default.applyRoutes(application)
}

exports. default = routes
