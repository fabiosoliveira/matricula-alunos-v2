import * as restify from 'restify'

export default (req: restify.Request, res: restify.Response, err, done): any => {
  err.toJSON = (): any => {
    return {
      message: err.message
    }
  }

  switch (err.name) {
    case 'MongoError':
      if (err.code === 11000) {
        err.statusCode = 400
        err.toJSON = (): any => {
          return {
            message: 'E11000 duplicate key error collection',
            errors: [{ message: err.message }]
          }
        }
      }
      break
    case 'InvalidContentError':
      err.statusCode = 400
      err.toJSON = (): any => {
        return {
          message: err.name,
          errors: [{ message: err.message }]
        }
      }
      break
    case 'ValidationError':
      err.statusCode = 400

      const messages: any[] = []
      for (let name in err.errors) {
        messages.push({ message: err.errors[name].message })
      }

      err.toJSON = (): any => ({
        message: 'Validation error while processing your request',
        errors: messages
      })
      break
  }
  done()
}
