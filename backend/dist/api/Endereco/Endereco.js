"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _mongoose = require('mongoose');










const EnderecoSchema = new (0, _mongoose.Schema)({
  rua: {
    type: String,
    minlength: [5, 'Tamanho mínimo da `{PATH}` é 5'],
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  bairro: {
    type: String,
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3'],
    maxlength: [10, 'Tamanho máximo do `{PATH}` é 10'],
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  cep: {
    type: String,
    validate: {
      validator: (v) => /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/.test(v),
      msg: '`{VALUE}` não é um número válido'
    },
    required: false
  },
  cidade: {
    type: String,
    minlength: [3, 'Tamanho mínimo de `{PATH}` é 3'],
    maxlength: [10, 'Tamanho máximo de `{PATH}` é 10'],
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  endereco: {
    type: String,
    minlength: [5, 'Tamanho mínimo de `{PATH}` é 5'],
    unique: true,
    required: false
  },
  referencias: [String]
}, {
  timestamps: true
})

exports. default = _mongoose.model('Endereco', EnderecoSchema)
