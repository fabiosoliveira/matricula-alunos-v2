const _ = require('lodash')

module.exports = (req, res, next) => {
    const bundle = res.locals.bundle

    let errors = []

    if (bundle.errors) {
        errors = parseErrors(bundle.errors)
    } else if (bundle.name === 'MongoError') {
        errors.push(bundle.message)
    } else {
        next()
    }
    
    res.status(500).json({ errors })
}

const parseErrors = (nodeRestfulErrors) => {
    const errors = []
    _.forIn(nodeRestfulErrors, error => errors.push(error.message))
    return errors
}