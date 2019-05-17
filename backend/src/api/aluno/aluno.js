const restful = require('node-restful')
const mongoose = restful.mongoose
const { validateCPF, validateCNS } = require('../common/validators')

const quizSchema = {
    onibusEscolar: {
        type: String,
        required: false,
        select: false,
        enum: ['SIM', 'NAO']
    },
    necessidadeEspecial: {
        type: String,
        select: false,
        required: false
    },
    tratamentoEspecial: {
        type: String,
        select: false,
        required: false
    },
    algumaAlergia: {
        type: String,
        select: false,
        required: false
    },
    algumMedicamentoContinuado: {
        type: String,
        select: false,
        required: false
    },
    procedimentoEscolar: {
        type: String,
        required: false,
        select: false,
        enum: ['chamar-responsavel', 'levar-hospital']
        // ligar para o responsável e aguardar na unidade escolar
        // levar ao hospital e solicitar acompanhamento do responsável
    }
}

const rgSchema = {
    numeroRegistro: {
        type: String,
        length: 10,
        select: true,
        required: false
    },
    dataEspedicao: {
        type: Date,
        select: true,
        required: false
    },
    emissor: {
        type: String,
        select: true,
        required: false
    },
    nomePai: {
        type: String,
        maxlength: 80,
        minlength: 3,
        select: true,
        required: false
    },
    nomeMae: {
        type: String,
        maxlength: 80,
        minlength: 3,
        select: true,
        required: false
    }
}

const enderecoSchema = {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endereco',
        required: false
    },
    endereco: {
        type: String,
        minlength: 5,
        //select: true,
        unique: false,
        required: false
    }
}

const responsavelSchema = {
    nome: {
        type: String,
        maxlength: 80,
        minlength: 3,
        select: false,
        required: false
    },
    parentesco: {
        type: String,
        minlength: 3,
        maxlength: 10,
        select: false,
        required: false
    }, // pai, mãe, tio, etc...
    rg: {
        type: rgSchema,
        select: false,
        required: false
    },
    cpf: {
        type: String,
        required: false,
        unique: false,
        select: false,
        validate: {
            validator: validateCPF,
            message: '{PATH}: CPF Inválido ({VALUE})'
        }
    }
}

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    dataNascimento: {
        type: Date,
        default: Date.now(),
        required: true
    },
    cor: {
        type: String,
        required: false,
        enum: ['BRANCO', 'PARDO', 'NEGRO']
    },
    genero: {
        type: String,
        required: true,
        enum: ['MASCULINO', 'FEMININO']
    },
    telefone: {
        type: String,
        /*
            Formato do telefone aceito: (99) 99999-9999
            Outro formato aceito: (99) 9999-9999
        */
        match: /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/,
        required: false
    },
    numeroSus: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateCNS,
            message: '{PATH}: SUS Inválido ({VALUE})'
        },
        select: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateCPF,
            message: '{PATH}: CPF Inválido ({VALUE})'
        },
        select: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    endereco: enderecoSchema,
    status: {
        type: String,
        required: true,
        enum: ['ATIVO', 'INATIVO', 'MATRICULADO']
    },
    rg: rgSchema,
    responsavel: responsavelSchema,
    quiz: quizSchema,
})

module.exports = restful.model('Aluno', alunoSchema)