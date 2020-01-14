"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

var _Foto = require('./Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _ModelController = require('../common/ModelController'); var _ModelController2 = _interopRequireDefault(_ModelController);

class FotoController extends _ModelController2.default {
   __init() {this.s3 = new _awssdk2.default.S3()}

   constructor () {
    super(_Foto2.default);FotoController.prototype.__init.call(this);FotoController.prototype.__init2.call(this);FotoController.prototype.__init3.call(this);
  }

   __init2() {this.postFoto = async (req, res, next) => {
    const { name, size, path, type } = req.files.file
    const key = path.substring(12)

    if (process.env.STORAGE_TYPE !== 's3') {
      const foto = await _Foto2.default.create({
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

    this.s3.upload(params, async (err, data) => {
      if (err) {
        throw err
      }
      const foto = await _Foto2.default.create({
        name,
        size,
        key,
        url: data.Location || ''
      })

      res.json(foto)
      console.log(`File uploaded successfully. ${data.Location}`)
    })

    return next()
  }}

   __init3() {this.removeFoto = async (req, res, next) => {
    const post = await _Foto2.default.findById(req.params.id)

    await post.remove()

    return res.send()
  }}

   applyRoutes (application) {
    application.get(this.basePath, this.findAll)
    // application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, [this.postFoto])
    // application.put(`${this.basePath}/:id`, [this.createEndereco, this.replace])
    // application.patch(`${this.basePath}/:id`, [this.update])
    application.del(`${this.basePath}/:id`, this.removeFoto)
  }
}

exports. default = new FotoController()
