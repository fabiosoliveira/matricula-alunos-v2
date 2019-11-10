import restify, { Request, Response, Next } from 'restify'

import { s3 } from '../../config/storage'
import Foto, { FotoInterface } from './Foto'
import ModelController from '../common/ModelController'

class FotoController extends ModelController<FotoInterface> {
  public constructor () {
    super(Foto)
  }

  private postFoto = (req: Request, res: Response, next: Next): void => {
    const { name, size, path, type } = req.files.file
    const key = path.substring(12)

    // const fileContent = fs.readFileSync(path)
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key, // File name you want to save as in S3
      ContentType: type,
      ACL: 'public-read',
      Body: req.params.file // fileContent
    }

    s3.upload(params, async (err, data): Promise<void> => {
      if (err) {
        throw err
      }
      const foto = await Foto.create({
        name,
        size,
        key,
        url: data.Location || ''
      })

      res.json(foto)
      console.log(`File uploaded successfully. ${data.Location}`)
    })

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
