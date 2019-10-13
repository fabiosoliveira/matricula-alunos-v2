function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const URL = 'http://localhost:3003/api'

const TOKEN_DO_GERADOR = 'ad23470ce912e2e449235a15e3d19e43'

const URL_CNS_GERADOR = 'http://geradorapp.com/api/v1/cns/generate?token=' + TOKEN_DO_GERADOR
const URL_CPF_GERADOR = 'http://geradorapp.com/api/v1/cpf/generate?token=' + TOKEN_DO_GERADOR

module.exports = { getRandomIntInclusive, URL, URL_CNS_GERADOR, URL_CPF_GERADOR }