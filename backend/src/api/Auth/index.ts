import restify, { Request, Response, Next } from 'restify'
import User, { UserInterface } from './User'
import ModelController from '../common/ModelController'
// import model from '../common/modelTransactions'
// import { ClientSession } from 'mongodb'
// import Endereco from '../Endereco/Endereco'
import { BadRequestError } from 'restify-errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController extends ModelController<UserInterface> {
  public constructor() {
    super(User)
  }

  private register = async (req: Request, res: Response, next: Next): Promise<void> => {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) {
        return next(new BadRequestError('User already exists'))
      }

      const user = await User.create(req.body)
      user.password = undefined

      return res.send({ user })
    } catch (err) {
      return next(new BadRequestError('Registration Failed'))
    }
  }

  private authenticate = async (req: Request, res: Response, next: Next): Promise<void> => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new BadRequestError('User not found'))
    }

    if (!await bcrypt.compare(password, user.password)) {
      return next(new BadRequestError('Invalid password'))
    }

    user.password = undefined

    const token = jwt.sign({ id: user.id }, process.env.AUTH_SECRET, {
      expiresIn: 86400 // 86400 segundos = 1 dia
    })

    res.send({ user, token })
  }

  public applyRoutes(application: restify.Server): void {
    // application.get(this.basePath, this.findAll)
    // application.get(`${this.basePath}/:id`, this.findById)
    application.post(`/api/auths/register`, this.register)
    application.post(`/api/auths/authenticate`, this.authenticate)
    // application.put(`${this.basePath}/:id`, this.replaceAluno)
    // application.del(`${this.basePath}/:id`, this.deleteAluno)
    // application.patch(`${this.basePath}/:id`, this.update)
  }
}

export default new AuthController()
