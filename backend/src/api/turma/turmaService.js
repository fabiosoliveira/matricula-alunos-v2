const Turma = require('./turma')
const errorHandler = require('../common/errorHandler')

Turma.methods(['get', 'post', 'put', 'delete'])
Turma.updateOptions({ new: true, runValidators: true })
Turma.after('post', errorHandler).after('put', errorHandler)

// Turma.route('count', (req, res, next) => {
//     Turma.count((error, value) => {
//         if (error) {
//             res.status(500).json({ errors: [error] })
//         } else {
//             res.json({ value })
//         }
//     })
// })

module.exports = Turma