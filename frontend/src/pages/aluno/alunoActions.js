import axios from 'axios'
import commonAction, {BASE_URL} from '../commonActions'

export function getList() {
    const request = axios.get(`${BASE_URL}/alunos`)
    return {
        type: 'ALUNOS_FETCHED',
        payload: request
    }
}

export function create(values) {
    return commonAction.submit(values, 'post', 'alunos', init)
}

export function update(values) {
    return commonAction.submit(values, 'put', 'alunos', init)
}

export function remove(values) {
    return commonAction.submit(values, 'delete', 'alunos', init)
}

export function showUpdate(aluno) {
    return commonAction.showUpdate(aluno, 'alunoForm')
}

export function showDelete(aluno) {
    return commonAction.showDelete(aluno, 'alunoForm')
}

export function init() {
    return [
        ...commonAction.init('alunoForm'), 
        getList()
    ]
}