const express = require('express')

module.exports = function (server) {

    // Definir URL base para todas as rotas
    const router = express.Router()
    server.use('/api', router)

    // Rotas de Endereço
    const Endereco = require('../api/endereco/enderecoService')
    Endereco.register(router, '/enderecos')

    // Rotas de Aluno
    const Aluno = require('../api/aluno/alunoService')
    Aluno.register(router, '/alunos')

    // Rotas de Turma
    const Turma = require('../api/turma/turmaService')
    Turma.register(router, '/turmas')
}