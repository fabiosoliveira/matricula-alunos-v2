"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _mongoose = require('mongoose');
var _util = require('../common/util'); var _util2 = _interopRequireDefault(_util);








const alunoResumoSchema = new (0, _mongoose.Schema)({
  aluno: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  nome: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    maxlength: [80, 'Tamanho máximo do `{PATH}` é 80'],
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3']
  },
  dataNascimento: {
    type: Date,
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  status: _util2.default.call(void 0, ['CURSANDO', 'APROVADO', 'REPROVADO', 'DESISTENTE'], [true, 'Campo `{PATH}` é obrigatório'])
}, {
  timestamps: true
})











const turmaSchema = new (0, _mongoose.Schema)({
  nome: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    unique: true,
    maxlength: [80, 'Tamanho máximo do `{PATH}` é 80'],
    minlength: [5, 'Tamanho mínimo do `{PATH}` é 5']
  },
  ano: {
    type: Number,
    min: [1970, 'Valor máximo do `{PATH}` é 1970'],
    max: [2100, 'Valor mínimo do `{PATH}` é 2100'],
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  turno: _util2.default.call(void 0, ['MATUTINO', 'VESPERTINO', 'NOTURNO'], [true, 'Campo `{PATH}` é obrigatório']),
  tipo: _util2.default.call(void 0, ['EIXO', 'ANO'], [true, 'Campo `{PATH}` é obrigatório']),
  serie: {
    type: Number,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    min: [4, 'Valor mínimo do `{PATH}` é 4'],
    max: [9, 'Valor máximo do `{PATH}` é 9']
  },
  turma: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    match: /^[A-Z]{1}$/
  },
  alunos: [alunoResumoSchema]
}, {
  timestamps: true
})

exports. default = _mongoose.model('Turma', turmaSchema)
