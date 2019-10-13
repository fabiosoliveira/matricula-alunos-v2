import * as restify from 'restify'
import mongoose from 'mongoose'
import corsMiddleware, { CorsMiddleware } from 'restify-cors-middleware'

import handleError from '../api/common/errorHandler'
import routes from './routes'
import { ClientSession } from 'mongodb'

export class App {
  public server: restify.Server

  public constructor () {
    this.server = restify.createServer()

    this.middlewares()
    this.database()
    this.routes()
    this.server.on('restifyError', handleError)
  }

  public startSession (): Promise<ClientSession> {
    return mongoose.startSession()
  }

  private middlewares (): void {
    const cors = this.corsConfiguration()
    this.server.pre(cors.preflight)
    this.server.use(cors.actual)
    // this.server.use(restify.plugins.urlEncodedBodyParser())
    this.server.use(restify.plugins.queryParser())
    this.server.use(restify.plugins.bodyParser())
  }

  private corsConfiguration (): CorsMiddleware {
    return corsMiddleware({
      // preflightMaxAge: 5, // Optional
      origins: ['*'],
      allowHeaders: ['API-Token'],
      exposeHeaders: ['API-Token-Expiry']
    })
  }

  private database (): void {
    // const url = 'mongodb://localhost:27017/matricula'
    // const url = 'mongodb://localhost:27017,localhost:27018,localhost:27019/matricula'
    const url = 'mongodb+srv://erca:erca123@fabioteste-7iby2.mongodb.net/matricula?retryWrites=true&w=majority'
    mongoose.connect(url, {
      useCreateIndex: true,
      useNewUrlParser: true
      // replicaSet: 'rs',
      // useFindAndModify: false
    })
  }

  private routes (): void {
    routes(this.server)
  }

  public async shutdown (): Promise<void> {
    return mongoose.disconnect().then((): void => this.server.close())
  }
}

export default new App()
