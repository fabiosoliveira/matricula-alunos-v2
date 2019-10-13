import { TurmaInterface } from './Turma'
import { model, Document, Schema } from 'mongoose'
import CreateEnum from '../common/util'

export interface AlunoResumoInterface {
    aluno: string,
    nome: string,
    dataNascimento: Date,
    status: string
}

const alunoResumoSchema = new Schema({
  aluno: {
    type: Schema.Types.ObjectId,
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
  status: CreateEnum(['CURSANDO', 'APROVADO', 'REPROVADO', 'DESISTENTE'], [true, 'Campo `{PATH}` é obrigatório'])
}, {
  timestamps: true
})

export interface TurmaInterface extends Document {
  nome: string,
  ano: number,
  turno: string,
  tipo: string,
  serie: number,
  turma: string,
  alunos: AlunoResumoInterface[]
}

const turmaSchema = new Schema({
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
  turno: CreateEnum(['MATUTINO', 'VESPERTINO', 'NOTURNO'], [true, 'Campo `{PATH}` é obrigatório']),
  tipo: CreateEnum(['EIXO', 'ANO'], [true, 'Campo `{PATH}` é obrigatório']),
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

export default model<TurmaInterface>('Turma', turmaSchema)
