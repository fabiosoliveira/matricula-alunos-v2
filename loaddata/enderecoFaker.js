const request = require('sync-request')
const faker = require('faker')
faker.locale = 'pt_BR'

const { getRandomIntInclusive, URL } = require("./util/util")

class EnderecoFacker {
    constructor() {
        this.start()
    }

    start() {
        let contador = 0

        //Carregando coleção endereco
        while (contador < 1000) {
            if (this.requestEndereco()) contador++
        }
    
        console.log('Load Endereco Collection', contador)
    }

    requestEndereco() {

        const endereco = {
            rua: faker.address.streetName(),
            bairro: getRandomIntInclusive(0, 1) ? 'Centro' : 'Zona Rural',
            cep: faker.address.zipCode(),
            cidade: faker.address.city()
        }

        const size = endereco.cep.length

        if (size === 5) {
            endereco.cep = `${endereco.cep.slice(0, 2)}.${endereco.cep.slice(2, 5)}-000`
        } else if (size === 9) {
            const zipCode = endereco.cep.split('-')
            endereco.cep = `${zipCode[0].slice(0, 2)}.${zipCode[0].slice(2, 5)}-${zipCode[1]}`
        } else return 0


        var res = request('POST', `${URL}/enderecos`, {
            json: endereco,
        });
        if (res.statusCode === 200) {
            return true
        }
        return false
    }
}

module.exports = EnderecoFacker