"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose');
var _CPFValidator = require('../common/validators/CPFValidator'); var _CPFValidator2 = _interopRequireDefault(_CPFValidator);
var _CNSValidator = require('../common/validators/CNSValidator'); var _CNSValidator2 = _interopRequireDefault(_CNSValidator);
var _util = require('../common/util'); var _util2 = _interopRequireDefault(_util);










const quizSchema = {
  onibusEscolar: _util2.default.call(void 0, ["SIM", "NAO"], false),
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
  procedimentoEscolar: _util2.default.call(void 0, 
    ["CHAMAR-RESPONSAVEL", "LEVAR-AO-HOSPITAL"],
    false
  )
};









const rgSchema = {
  numeroRegistro: {
    type: String,
    length: [10, "Tamanho do `{PATH}` é 10"],
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
    maxlength: [80, "Tamanho máximo do `{PATH}` é 80"],
    minlength: [3, "Tamanho mínimo do `{PATH}` é 3"],
    required: false
  },
  nomeMae: {
    type: String,
    maxlength: [80, "Tamanho máximo do `{PATH}` é 80"],
    minlength: [3, "Tamanho mínimo do `{PATH}` é 3"],
    required: false
  }
};






const enderecoSchema = {
  id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Endereco",
    required: false
  },
  endereco: {
    type: String,
    minlength: [5, "Tamanho mínimo do `{PATH}` é 5"],
    required: false
  }
};








const responsavelSchema = {
  nome: {
    type: String,
    maxlength: [80, "Tamanho máximo do `{PATH}` é 80"],
    minlength: [3, "Tamanho mínimo do `{PATH}` é 3"],
    required: false
  },
  parentesco: {
    type: String,
    minlength: [3, "Tamanho mínimo do `{PATH}` é 3"],
    maxlength: [10, "Tamanho máximo do `{PATH}` é 10"],
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
      validator: _CPFValidator2.default,
      message: "{PATH}: CPF Inválido ({VALUE})"
    }
  }
};










const fotoSchema = {
  _id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Foto",
    required: false
  },
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: String
};
















const alunoSchema = new (0, _mongoose.Schema)(
  {
    nome: {
      type: String,
      required: [true, "Campo `{PATH}` é obrigatório"],
      maxlength: [80, "Tamanho máximo do `{PATH}` é 80"],
      minlength: [3, "Tamanho mínimo do `{PATH}` é 3"]
    },
    dataNascimento: {
      type: Date,
      default: Date.now(),
      required: [true, "Campo `{PATH}` é obrigatório"]
    },
    cor: _util2.default.call(void 0, ["BRANCO", "PARDO", "NEGRO"], false),
    genero: {
      type: String,
      required: [true, "Campo `{PATH}` é obrigatório"],
      enum: ["MASCULINO", "FEMININO"],
      validate: {
        validator: (v) => /MASCULINO|FEMININO/i.test(v),
        msg: "valor `{VALUE}` do campo `{PATH}` é inválido"
      }
    },
    telefone: {
      type: String,
      /*
                                Formato do telefone aceito: (99) 99999-9999
                                Outro formato aceito: (99) 9999-9999
                            */
      validate: {
        validator: (v) =>
          /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/.test(v),
        msg: "`{VALUE}` não é um número válido"
      },
      required: false
    },
    numeroSus: {
      type: String,
      required: [true, "Campo `{PATH}` é obrigatório"],
      unique: true,
      validate: {
        validator: _CNSValidator2.default,
        msg: "{PATH}: SUS Inválido ({VALUE})"
      }
    },
    cpf: {
      type: String,
      required: [true, "Campo `{PATH}` é obrigatório"],
      unique: true,
      validate: {
        validator: _CPFValidator2.default,
        msg: "{PATH}: CPF Inválido ({VALUE})"
      }
    },
    foto: fotoSchema,
    endereco: enderecoSchema,
    status: _util2.default.call(void 0, 
      ["ATIVO", "INATIVO", "MATRICULADO"],
      [true, "Campo `{PATH}` é obrigatório"]
    ),
    rg: rgSchema,
    responsavel: responsavelSchema,
    quiz: quizSchema
  },
  {
    timestamps: true
  }
);

exports. default = _mongoose.model("Aluno", alunoSchema);
