import axios from 'axios'
import commonAction, {BASE_URL} from '../commonActions'

export function getList() {
    const request = axios.get(`${BASE_URL}/enderecos`)
    return {
        type: 'ENDERECOS_FETCHED',
        payload: request
    }
}

export function create(values) {
    return commonAction.submit(values, 'post', 'enderecos', init)
}

export function update(values) {
    return commonAction.submit(values, 'put', 'enderecos', init)
}

export function remove(values) {
    return commonAction.submit(values, 'delete', 'enderecos', init)
}

export function showUpdate(endereco) {
    return commonAction.showUpdate(endereco, 'enderecoForm')
}

export function showDelete(endereco) {
    return commonAction.showDelete(endereco, 'enderecoForm')
}

export function init() {
    return [
        ...commonAction.init('enderecoForm'), 
        getList()
    ]
}
