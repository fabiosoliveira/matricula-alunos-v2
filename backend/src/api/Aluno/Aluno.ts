import { model, Document, Schema } from 'mongoose'
import CPFValidator from '../common/validators/CPFValidator'
import CNSValidator from '../common/validators/CNSValidator'
import CreateEnum from '../common/util'

interface QuizInterface {
    onibusEscolar?: string,
    necessidadeEspecial?: string,
    tratamentoEspecial?: string,
    algumaAlergia?: string,
    algumMedicamentoContinuado?: string,
    procedimentoEscolar?: string
}

const quizSchema = {
  onibusEscolar: CreateEnum(['SIM', 'NAO'], false),
  necessidadeEspecial: {
    type: String,
    required: false
  },
  tratamentoEspecial: {
    type: String,
    required: false
  },
  algumaAlergia: {
    type: String,
    required: false
  },
  algumMedicamentoContinuado: {
    type: String,
    required: false
  },
  procedimentoEscolar: CreateEnum(['CHAMAR-RESPONSAVEL', 'LEVAR-AO-HOSPITAL'], false)
}

interface RgInterface {
    numeroRegistro?: string,
    dataEspedicao?: Date,
    emissor?: string,
    nomePai?: string,
    nomeMae?: string
}

const rgSchema = {
  numeroRegistro: {
    type: String,
    length: [10, 'Tamanho do `{PATH}` é 10'],
    required: false
  },
  dataEspedicao: {
    type: Date,
    required: false
  },
  emissor: {
    type: String,
    required: false
  },
  nomePai: {
    type: String,
    maxlength: [80, 'Tamanho máximo do `{PATH}` é 80'],
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3'],
    required: false
  },
  nomeMae: {
    type: String,
    maxlength: [80, 'Tamanho máximo do `{PATH}` é 80'],
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3'],
    required: false
  }
}

interface EnderecoInterface {
    id?: string,
    endereco?: string
}

const enderecoSchema = {
  id: {
    type: Schema.Types.ObjectId,
    ref: 'Endereco',
    required: false
  },
  endereco: {
    type: String,
    minlength: [5, 'Tamanho mínimo do `{PATH}` é 5'],
    required: false
  }
}

interface ResponsavelInterface {
    nome?: string,
    parentesco?: string,
    rg?: RgInterface,
    cpf?: string
}

const responsavelSchema = {
  nome: {
    type: String,
    maxlength: [80, 'Tamanho máximo do `{PATH}` é 80'],
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3'],
    required: false
  },
  parentesco: {
    type: String,
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3'],
    maxlength: [10, 'Tamanho máximo do `{PATH}` é 10'],
    required: false
  }, // pai, mãe, tio, etc...
  rg: {
    type: rgSchema,
    required: false
  },
  cpf: {
    type: String,
    required: false,
    validate: {
      validator: CPFValidator,
      message: '{PATH}: CPF Inválido ({VALUE})'
    }
  }
}

export interface AlunoInterface extends Document {
    nome: string,
    dataNascimento: Date,
    cor?: string,
    genero: string,
    telefone?: string,
    numeroSus: string,
    cpf: string,
    endereco?: EnderecoInterface,
    status: string,
    rg?: RgInterface,
    responsavel?: ResponsavelInterface,
    quiz?: QuizInterface
}

const alunoSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    maxlength: [80, 'Tamanho máximo do `{PATH}` é 80'],
    minlength: [3, 'Tamanho mínimo do `{PATH}` é 3']
  },
  dataNascimento: {
    type: Date,
    default: Date.now(),
    required: [true, 'Campo `{PATH}` é obrigatório']
  },
  cor: CreateEnum(['BRANCO', 'PARDO', 'NEGRO'], false),
  genero: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    enum: ['MASCULINO', 'FEMININO'],
    validate: {
      validator: (v: string): boolean => /MASCULINO|FEMININO/i.test(v),
      msg: 'valor `{VALUE}` do campo `{PATH}` é inválido'
    }
  },
  telefone: {
    type: String,
    /*
                                Formato do telefone aceito: (99) 99999-9999
                                Outro formato aceito: (99) 9999-9999
                            */
    validate: {
      validator: (v: string):boolean =>
        /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/.test(v),
      msg: '`{VALUE}` não é um número válido'
    },
    required: false
  },
  numeroSus: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    unique: true,
    validate: {
      validator: CNSValidator,
      msg: '{PATH}: SUS Inválido ({VALUE})'
    }
  },
  cpf: {
    type: String,
    required: [true, 'Campo `{PATH}` é obrigatório'],
    unique: true,
    validate: {
      validator: CPFValidator,
      msg: '{PATH}: CPF Inválido ({VALUE})'
    }
  },
  endereco: enderecoSchema,
  status: CreateEnum(['ATIVO', 'INATIVO', 'MATRICULADO'], [true, 'Campo `{PATH}` é obrigatório']),
  rg: rgSchema,
  responsavel: responsavelSchema,
  quiz: quizSchema
}, {
  timestamps: true
})

export default model<AlunoInterface>('Aluno', alunoSchema)
