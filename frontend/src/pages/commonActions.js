import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'
import { BASE_URL, TAB_LIST, TAB_UPDATE, TAB_CREATE, TAB_DELETE } from "../pages/consts";

const INITIAL_VALUES = {}

export function submit(values, method, source, init) {
    return dispatch => {
        const id = values._id ? `/${values._id}` : ''
          axios[method](`${BASE_URL}/${source}${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error.message))
            })
    }
}

export function showUpdate(value, form) {
    return [
        showTabs(TAB_UPDATE),
        selectTab(TAB_UPDATE),
        initialize(form, value)
    ]
}

export function showDelete(value, form) {
    return [
        showTabs(TAB_DELETE),
        selectTab(TAB_DELETE),
        initialize(form, value)
    ]
}

export function init(form, initial_values = INITIAL_VALUES) {
    return [
        showTabs(TAB_LIST, TAB_CREATE),
        selectTab(TAB_LIST),
        initialize(form, initial_values)
    ]
}

const commonActions = { submit, showUpdate, showDelete, init}
export default commonActions