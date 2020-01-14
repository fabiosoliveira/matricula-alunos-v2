import * as restify from 'restify'
import mongoose from 'mongoose'
import corsMiddleware, { CorsMiddleware } from 'restify-cors-middleware'

import handleError from '../api/common/errorHandler'
import routes from './routes'
import { ClientSession } from 'mongodb'

import dotenv from 'dotenv'
dotenv.config()

export class App {
  public server: restify.Server

  public constructor() {
    this.server = restify.createServer()

    this.middlewares()
    this.database()
    this.routes()
    this.server.on('restifyError', handleError)
  }

  public startSession(): Promise<ClientSession> {
    return mongoose.startSession()
  }

  private middlewares(): void {
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

  private corsConfiguration(): CorsMiddleware {
    return corsMiddleware({
      // preflightMaxAge: 5, // Optional
      origins: ['*'],
      allowHeaders: ['API-Token'],
      exposeHeaders: ['API-Token-Expiry']
    })
  }

  private database(): void {
    // const url = 'mongodb://localhost:27017/matricula'
    // const url = 'mongodb://localhost:27017,localhost:27018,localhost:27019/matricula'
    mongoose.connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true
      // replicaSet: 'rs',
      // useFindAndModify: false
    })
  }

  private routes(): void {
    routes(this.server)
  }

  public async shutdown(): Promise<void> {
    return mongoose.disconnect().then((): void => this.server.close())
  }
}

export default new App()
