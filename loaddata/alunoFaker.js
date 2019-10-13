const request = require('sync-request')
const faker = require('faker')
faker.locale = 'pt_BR'

const { getRandomIntInclusive, URL, URL_CNS_GERADOR, URL_CPF_GERADOR } = require("./util/util")


class AlunoFaker {
    
    constructor(){
        this.start()
    }
    
    start(){
        this.cpf = require('./cpf.json')
        this.cns = require('./cns.json')

        const resp = request('GET', `${URL}/enderecos`)
        this.enderecoArray = JSON.parse(resp.getBody('utf8'))
        this.enderecoArray = this.enderecoArray.items
        console.log(this.enderecoArray[0])

        let contador = 0

        // Carregando coleção aluno
        while (contador < 1000) {
            if (this.requestAluno()) contador++
        }
    
        console.log('Load Aluno Collection', contador)
    }

    getEndereco(){
        //const index = getRandomIntInclusive(0, 999)
        return this.enderecoArray.pop()
    }
    
    requestAluno() {
        const foundEndereco = this.getEndereco()

        const endereco = {
            id: foundEndereco._id,
            endereco: foundEndereco.endereco
        }
    
        const responsavel = {
            nome: faker.name.findName(),
            parentesco: faker.random.arrayElement(['pai', 'mãe', 'tio', 'avô', 'avó']),
            rg: this.gerarRg(),
            cpf: this.gerarCpf()
        }
    
        const necessidadeEspeciais = ['Autismo', 'Doença Crônica', 'Perda Auditiva e Surdez', 
            'Deficiência Intelectual', 'Deficiência de Aprendizado', 'Perda de Memória', 'Doença Mental',
            'Deficiência Física', 'Distúrbios da Fala e da Linguagem', 'Perda de Visão e Cegueira']
    
        const alergias = ['Ácaros', 'Fungos', 'Insetos', 'Pelos de animais', 'Pólens', 'Alimentos' ,'Medicamentos']
    
        const medicamentos = ['Neosoro', 'Puran T4', 'Salonpas', 'Buscopan Composto', 'Rivotril',
            'Dorflex', 'Glifage', 'Hipoglós']

        const tratamentos = ['Cardioversão', 'Cistocentese', 'Desbridamento', 'Desintoxicação',
            'Imunoterapia', 'Terapia larval', 'Terapia megavitamínica', 'Pleurodese', 'Profilaxia pós-exposição']
    
        const quiz = {
            onibusEscolar: faker.random.arrayElement(['SIM', 'NAO']),
            necessidadeEspecial: faker.random.arrayElement(necessidadeEspeciais),
            tratamentoEspecial: faker.random.arrayElement(tratamentos),
            algumaAlergia: faker.random.arrayElement(alergias),
            algumMedicamentoContinuado: faker.random.arrayElement(medicamentos),
            procedimentoEscolar: faker.random.arrayElement(['CHAMAR-RESPONSAVEL', 'LEVAR-AO-HOSPITAL'])
        }
    
        const aluno = {
            nome: faker.name.findName(),
            dataNascimento: faker.date.past(),
            cor: faker.random.arrayElement(['BRANCO', 'PARDO', 'NEGRO']),
            genero: faker.random.arrayElement(['MASCULINO', 'FEMININO']),
            telefone: faker.phone.phoneNumber('(75) 9####-####'),
            numeroSus: this.gerarCns(),
            cpf: this.gerarCpf(),
    
            endereco: endereco, //{id, endereco}
            status: faker.random.arrayElement(['ATIVO', 'INATIVO', 'MATRICULADO']),
            rg: this.gerarRg(),
            responsavel: responsavel,
            quiz: quiz
        }
    
        var res = request('POST', `${URL}/alunos`, {
            json: aluno,
        })

        if (res.statusCode === 200) {
            return true
        }
        // console.log(res.getBody())
        return false
    }

    gerarRg(){
        const rg = {
            numeroRegistro: faker.random.number({min:10000000000, max:99999999999}),
            dataEspedicao: faker.date.past(),
            emissor: faker.random.arrayElement(['SSP/BA', 'SSP/SP', 'SSP/RJ', 'SSP/MG']),
            nomePai: faker.name.findName(),
            nomeMae: faker.name.findName()
        }

        let rgFormatted = '' + rg.numeroRegistro
        rgFormatted = rgFormatted.slice(0, 3)+'.'+rgFormatted.slice(3, 6)+'.'
                        +rgFormatted.slice(6, 9)+'-'+rgFormatted.slice(9 ,11)
    
        rg.numeroRegistro = rgFormatted
        return rg
    }
    
    gerarCpf(){
        const resp = this.cpf.pop()
        return resp.data.number_formatted
    }
    
    gerarCns() {
        return this.cns.pop().data.number_formatted
    }
}

module.exports = AlunoFaker