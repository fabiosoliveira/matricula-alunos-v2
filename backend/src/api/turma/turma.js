const restful = require('node-restful')
const mongoose = restful.mongoose

const alunoResumoSchema = new mongoose.Schema({
    aluno: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },
    nome: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['CURSANDO', 'APROVADO', 'REPROVADO', 'DESISTENTE']
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const turmaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true,
        maxlength: 80,
        minlength: 5
    },
    ano: {
        type: Number,
        min: 1970,
        max: 2100,
        required: true
    },
    turno: {
        type: String,
        required: true,
        enum: ['MATUTINO', 'VESPERTINO', 'NOTURNO']
    },
    tipo: {
        type: String,
        required: true,
        enum: ['EIXO', 'SERIE']
    },
    serie: {
        type: Number,
        required: true,
        min: 4,
        max: 9
    },
    turma: {
        type: String,
        required: true,
        match: /^[A-Z]{1}$/
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    alunos: [alunoResumoSchema]
})

module.exports = restful.model('Turma', turmaSchema)