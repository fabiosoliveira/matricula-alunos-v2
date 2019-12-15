const fs = require('fs')
const request = require('sync-request')

const { URL_CNS_GERADOR, URL_CPF_GERADOR } = require("./util/util")
const cpfFile = './cpf.json'
const cnsFile = './cns.json'

function save (content, file){
    const contentString = JSON.stringify(content)
    return fs.writeFileSync(file, contentString)
}

function load(file) {
    const fileBuffer = fs.readFileSync(file, 'utf-8')
    return JSON.parse(fileBuffer)
}

function gerarCpf(){
    const resp = request('GET', URL_CPF_GERADOR)
    return JSON.parse(resp.getBody('utf8'))
}

function gerarCns() {
    const resp = request('GET', URL_CNS_GERADOR)
    return JSON.parse(resp.getBody('utf8'))
}

let size = 0
setInterval(() => {
    const cpfSet = new Set(load(cpfFile))
    while (size < 2000) {
        try {
            const resp = gerarCpf()
            cpfSet.add(resp)
            size = cpfSet.size
            console.log('CPF: '+size)
        } catch (error) {
            break
        }
    }
    save([...cpfSet], cpfFile)
}, 10000);


// const cnsSet = new Set(load(cnsFile))
// size = 0
// while (size < 1000) {
//     try {
//         const resp = gerarCns()
//         cnsSet.add(resp)
//         size = cnsSet.size
//         console.log('CNS: '+size)
//     } catch (error) {
//         break
//     }
// }

// save([...cnsSet], cnsFile)
