import axios from 'axios'
import { toastr } from 'react-redux-toastr'
// import { reset as resetForm, initialize } from 'redux-form'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

export const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {}

export function submit(values, method, source, init) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/${source}/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(value, form) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize(form, value)
    ]
}

export function showDelete(value, form) {
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize(form, value)
    ]
}

export function init(form) {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        initialize(form, INITIAL_VALUES)
    ]
}

const commonActions = { submit, showUpdate, showDelete, init}
export default commonActions