import { TurmaInterface } from './../Turma/Turma'
import restify, { Request, Response, Next } from 'restify'

import Foto, { FotoInterface } from './Foto'
import ModelController from '../common/ModelController'

class FotoController extends ModelController<FotoInterface> {
  public constructor () {
    super(Foto)
  }

  private postFoto = async (req: Request, res: Response, next: Next): Promise<void> => {
    // console.log(req.files.file)
    const { name, size, path } = req.files.file
    // console.log(name, size, path.substring(12))
    const foto = await Foto.create({
      name,
      size,
      key: path.substring(12),
      url: ''
    })

    res.json(foto)
    return next()
  }

  public applyRoutes (application: restify.Server): void {
    // application.get(this.basePath, this.findAll)
    // application.get(`${this.basePath}/:id`, this.findById)

    // application.post(this.basePath, [multer(multerConfig).single('file'), this.postFoto])
    application.post(this.basePath, [this.postFoto])

    // application.put(`${this.basePath}/:id`, [this.createEndereco, this.replace])
    // application.patch(`${this.basePath}/:id`, [this.update])
    // application.del(`${this.basePath}/:id`, this.delete)
  }
}

export default new FotoController()
