import axios from 'axios'

import commonAction from '../commonActions'
import { TURMA_FORM, TURMAS_FETCHED, BASE_URL } from "../consts";

const INITIAL_VALUES = {alunos: [{}]}

export function getList(limit=10, page=1, search='', sort='') {
    let url = `${BASE_URL}/turmas?limit=${limit}&page=${page}&sort=${sort}&nome__regex=/${search}/i`

    const request = axios.get(url)
    return {
        type: TURMAS_FETCHED,
        payload: request
    }
}

export function create(values) {
    return commonAction.submit(values, 'post', 'turmas', init)
}

export function update(values) {
    return commonAction.submit(values, 'put', 'turmas', init)
}

export function remove(values) {
    return commonAction.submit(values, 'delete', 'turmas', init)
}

export function showUpdate(turma) {
    return commonAction.showUpdate(turma, TURMA_FORM)
}

export function showDelete(turma) {
    return commonAction.showDelete(turma, TURMA_FORM)
}

export function init() {
    return [
        ...commonAction.init(TURMA_FORM, INITIAL_VALUES), 
        getList()
    ]
}