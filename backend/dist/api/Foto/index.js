"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});
var _awssdk = require('aws-sdk'); var _awssdk2 = _interopRequireDefault(_awssdk);

var _Foto = require('./Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _ModelController = require('../common/ModelController'); var _ModelController2 = _interopRequireDefault(_ModelController);

var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _sharp = require('sharp'); var _sharp2 = _interopRequireDefault(_sharp);

class FotoController extends _ModelController2.default {
   __init() {this.s3 = new _awssdk2.default.S3()}

   constructor() {
    super(_Foto2.default);FotoController.prototype.__init.call(this);FotoController.prototype.__init2.call(this);FotoController.prototype.__init3.call(this);FotoController.prototype.__init4.call(this);
  }

   __init2() {this.resizeFoto = async (req, res, next) => {

    const params = {
      left: parseInt(req.body.left),
      top: parseInt(req.body.top),
      width: parseInt(req.body.width),
      height: parseInt(req.body.height)
    }

    const fileBuffer = await _sharp2.default.call(void 0, req.params.file)
      .extract(params)
      .resize(100)
      .toBuffer()

    if (!fileBuffer) {
      return next(new Error('problema na conversao'))
    }

    if (process.env.STORAGE_TYPE === 's3') {
      req.params.file = fileBuffer
      return next()
    }

    const { path } = req.files.file
    const key = path.substring(12)
    const newPath = `tmp/uploads/${key}`

    // Deletando o arquivo antigo
    // O fs.acess serve para testar se o arquivo realmente existe, evitando bugs
    _fs2.default.access(newPath, (err) => {
      // Um erro significa que a o arquivo não existe, então não tentamos apagar
      if (!err) {
        // Se não houve erros, tentamos apagar
        _fs2.default.unlink(newPath, (err) => {
          // Não quero que erros aqui parem todo o sistema, então só vou imprimir o erro, sem throw.
          if (err) {
            console.log(err)
          } else {
            // Agora vamos armazenar esse buffer no novo caminho
            _fs2.default.writeFile(newPath, fileBuffer, (err) => {
              if (err) {
                // Já aqui um erro significa que o upload falhou, então é importante que o usuário saiba.
                throw err;
              }
            })
          }
        })
      }
    })

    return next()
  }}

   __init3() {this.postFoto = async (req, res, next) => {
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

   __init4() {this.removeFoto = async (req, res, next) => {
    const post = await _Foto2.default.findById(req.params.id)

    await post.remove()

    return res.send()
  }}

   applyRoutes(application) {
    application.get(this.basePath, this.findAll)
    // application.get(`${this.basePath}/:id`, this.findById)
    application.post(this.basePath, [this.resizeFoto, this.postFoto])
    // application.put(`${this.basePath}/:id`, [this.createEndereco, this.replace])
    // application.patch(`${this.basePath}/:id`, [this.update])
    application.del(`${this.basePath}/:id`, this.removeFoto)
  }
}

exports. default = new FotoController()
