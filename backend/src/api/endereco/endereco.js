const restful = require('node-restful')
const mongoose = restful.mongoose

const enderecoSchema = new mongoose.Schema({
    rua: {
        type: String,
        minlength: 5,
        //select: false,
        required: true
    },
    bairro: {
        type: String,
        minlength: 3,
        maxlength: 10,
        //select: false,
        required: true
    },
    cep: {
        type: String,
        match: /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/,  // Ex.: 45.700-000
        ///^\\d{5}[-]\\d{3}$/, // Ex.: 45700-000
        //select: false,
        required: false
    },
    cidade: {
        type: String,
        minlength: 3,
        maxlength: 10,
        //select: false,
        required: true
    },
    endereco: {
        type: String,
        minlength: 5,
        //select: false,
        unique: true,
        required: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = restful.model('Endereco', enderecoSchema)