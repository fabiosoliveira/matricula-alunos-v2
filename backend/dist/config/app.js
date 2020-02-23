"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _restify = require('restify'); var restify = _interopRequireWildcard(_restify);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _restifycorsmiddleware = require('restify-cors-middleware'); var _restifycorsmiddleware2 = _interopRequireDefault(_restifycorsmiddleware);

var _errorHandler = require('../api/common/errorHandler'); var _errorHandler2 = _interopRequireDefault(_errorHandler);
var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);


var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config()

 class App {
  

   constructor() {
    this.server = restify.createServer()

    this.middlewares()
    this.database()
    this.routes()
    this.server.on('restifyError', _errorHandler2.default)
  }

   startSession() {
    return _mongoose2.default.startSession()
  }

   middlewares() {
    const cors = this.corsConfiguration()
    this.server.pre(cors.preflight)
    this.server.use(cors.actual)

    this.server.use(restify.plugins.queryParser())

    this.server.use(restify.plugins.bodyParser({
      keepExtensions: true,
      uploadDir: 'tmp/uploads',
      mapParams: true,
      mapFiles: true,
      maxFieldsSize: 2 * 1024 * 1024
    }))

    this.server.get('/api/files/*', restify.plugins.serveStatic({
      appendRequestPath: false,
      directory: './tmp/uploads'
    }))
  }

   corsConfiguration() {
    return _restifycorsmiddleware2.default.call(void 0, {
      // preflightMaxAge: 5, // Optional
      origins: ['*'],
      allowHeaders: ['API-Token'],
      exposeHeaders: ['API-Token-Expiry']
    })
  }

   database() {
    // const url = 'mongodb://localhost:27017/matricula'
    // const url = 'mongodb://localhost:27017,localhost:27018,localhost:27019/matricula'
    _mongoose2.default.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      // replicaSet: 'rs',
      useFindAndModify: false
    })
  }

   routes() {
    _routes2.default.call(void 0, this.server)
  }

   async shutdown() {
    return _mongoose2.default.disconnect().then(() => this.server.close())
  }
} exports.App = App;

exports. default = new App()
