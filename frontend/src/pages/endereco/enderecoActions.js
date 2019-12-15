import axios from 'axios'
import commonAction from '../commonActions'
import { ENDERECOS_FETCHED, ENDERECO_FORM, BASE_URL } from "../consts";

export function getList(limit=10, page=1, search='', sort='') {
    let url = `${BASE_URL}/enderecos?limit=${limit}&page=${page}&sort=${sort}&rua__regex=/${search}/i`

    const request = axios.get(url)
    return {
        type: ENDERECOS_FETCHED,
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
    return commonAction.showUpdate(endereco, ENDERECO_FORM)
}

export function showDelete(endereco) {
    return commonAction.showDelete(endereco, ENDERECO_FORM)
}

export function init() {
    return [
        ...commonAction.init(ENDERECO_FORM), 
        getList()
    ]
}
