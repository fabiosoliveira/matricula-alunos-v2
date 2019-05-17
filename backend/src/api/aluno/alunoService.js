const Aluno = require('./aluno')
const Endereco = require('../endereco/endereco')
const errorHandler = require('../common/errorHandler')

Aluno.methods(['get', 'post', 'put', 'delete'])
Aluno.updateOptions({ new: true, runValidators: true })
Aluno.after('post', errorHandler).after('put', errorHandler)

// Aluno.route('count', (req, res, next) => {
//     Aluno.count((error, value) => {
//         if (error) {
//             res.status(500).json({ errors: [error] })
//         } else {
//             res.json({ value })
//         }
//     })
// })


const enderecoHandler = (req, res, next) => {
    id = req.body.endereco.id

    Endereco.findById(id, 'endereco', (err, value) => {
        if (err) {
            res.status(500).json({ errors: [error] })
        } 
        req.body.endereco.endereco = value.endereco
        next()
    })
}

Aluno.before('post', enderecoHandler).before('put', enderecoHandler)

module.exports = Aluno