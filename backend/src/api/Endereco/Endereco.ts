import { EnderecoInterface } from './Endereco'
import { model, Document, Schema } from 'mongoose'

export interface EnderecoInterface extends Document {
    rua: string,
    bairro: string,
    cep?: string,
    cidade: string,
    endereco: string,
    referencias: string[]
}

const EnderecoSchema = new Schema({
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
      validator: (v: string):boolean => /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/.test(v),
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

export default model<EnderecoInterface>('Endereco', EnderecoSchema)
