const Endereco = require('./endereco')
const errorHandler = require('../common/errorHandler')

Endereco.methods(['get', 'post', 'put', 'delete'])
Endereco.updateOptions({ new: true, runValidators: true })
Endereco.after('post', errorHandler).after('put', errorHandler)

// Endereco.route('count', (req, res, next) => {
//     Endereco.count((error, value) => {
//         if (error) {
//             res.status(500).json({ errors: [error] })
//         } else {
//             res.json({ value })
//         }
//     })
// })

// middlewares
const enderecoHandler = (req, res, next) => {
    const criarEndereco = ({ rua, bairro, cidade }) => `${rua}, ${bairro}, ${cidade}`
    req.body.endereco = criarEndereco(req.body)
    next()
}

Endereco.before('post', enderecoHandler).before('put', enderecoHandler)

module.exports = Endereco