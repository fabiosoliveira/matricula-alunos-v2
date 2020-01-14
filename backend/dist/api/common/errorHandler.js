"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }Object.defineProperty(exports, "__esModule", {value: true});

exports. default = (req, res, err, done) => {
  err.toJSON = () => {
    return {
      message: err.message
    }
  }

  switch (err.name) {
    case 'MongoError':
      if (err.code === 11000) {
        err.statusCode = 400
        err.toJSON = () => {
          return {
            message: 'E11000 duplicate key error collection',
            errors: [{ message: err.message }]
          }
        }
      }
      break
    case 'InvalidContentError':
      err.statusCode = 400
      err.toJSON = () => {
        return {
          message: err.name,
          errors: [{ message: err.message }]
        }
      }
      break
    case 'ValidationError':
      err.statusCode = 400

      const messages = []
      for (let name in err.errors) {
        messages.push({ message: err.errors[name].message })
      }

      err.toJSON = () => ({
        message: 'Validation error while processing your request',
        errors: messages
      })
      break
  }
  done()
}
