import restify, { Request, Response, Next } from 'restify'

import Endereco, { EnderecoInterface } from './Endereco'
import ModelController from '../common/ModelController'

class EnderecoController extends ModelController<EnderecoInterface> {
  public constructor () {
    super(Endereco)
  }

  private createEndereco = (req: Request, res: Response, next: Next): void => {
    const criarEndereco = ({ rua, bairro, cidade }):string => `${rua}, ${bairro}, ${cidade}`
    const endereco: EnderecoInterface = req.body
    endereco.endereco = criarEndereco(endereco)
    return next()
  }

  public applyRoutes (application: restify.Server): void {
    application.get(this.basePath, this.findAll)
    application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, [this.createEndereco, this.save])
    application.put(`${this.basePath}/:id`, [this.createEndereco, this.replace])
    application.patch(`${this.basePath}/:id`, [this.update])
    application.del(`${this.basePath}/:id`, this.delete)
  }
}

export default new EnderecoController()
