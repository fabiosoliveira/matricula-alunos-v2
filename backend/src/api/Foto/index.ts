import restify, { Request, Response, Next } from 'restify'
import aws from 'aws-sdk'

import Foto, { FotoInterface } from './Foto'
import ModelController from '../common/ModelController'

class FotoController extends ModelController<FotoInterface> {
  private s3 = new aws.S3()

  public constructor () {
    super(Foto)
  }

  private postFoto = async (req: Request, res: Response, next: Next): Promise<void> => {
    const { name, size, path, type } = req.files.file
    const key = path.substring(12)

    if (process.env.STORAGE_TYPE !== 's3') {
      const foto = await Foto.create({
        name,
        size,
        key,
        url: ''
      })

      res.json(foto)
      return next()
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key, // File name you want to save as in S3
      ContentType: type,
      ACL: 'public-read',
      Body: req.params.file // fileContent
    }

    this.s3.upload(params, async (err, data): Promise<void> => {
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

  private removeFoto = async (req: Request, res: Response, next: Next): Promise<void> => {
    const post = await Foto.findById(req.params.id)

    await post.remove()

    return res.send()
  }

  public applyRoutes (application: restify.Server): void {
    application.get(this.basePath, this.findAll)
    // application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, [this.postFoto])
    // application.put(`${this.basePath}/:id`, [this.createEndereco, this.replace])
    // application.patch(`${this.basePath}/:id`, [this.update])
    application.del(`${this.basePath}/:id`, this.removeFoto)
  }
}

export default new FotoController()
