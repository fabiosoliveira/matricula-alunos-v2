const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

module.exports = mongoose.connect('mongodb://localhost/matricula')

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min =
  "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max =
  "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum =
  "'{VALUE}' não é válido para o atributo '{PATH}'."
mongoose.Error.messages.String.match =
  "'{VALUE}' não é válido para o atributo '{PATH}'."
