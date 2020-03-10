import * as restify from 'restify'

import turmaConstroller from '../api/Turma'
import alunoController from '../api/Aluno'
import enderecoController from '../api/Endereco'
import fotoController from '../api/Foto'
import authController from '../api/Auth'

function routes(application: restify.Server): void {
  turmaConstroller.applyRoutes(application)
  alunoController.applyRoutes(application)
  enderecoController.applyRoutes(application)
  fotoController.applyRoutes(application)
  authController.applyRoutes(application)
}

export default routes
