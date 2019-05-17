import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import TabReducer from '../common/tab/tabReducer'
import EnderecoReducer from '../pages/endereco/enderecoReducer'
import AlunoReducer from '../pages/aluno/alunoReducer'

const rootReducer = combineReducers({
    tab: TabReducer,
    endereco: EnderecoReducer,
    aluno: AlunoReducer,
    form: formReducer,
    toastr: toastrReducer
})

export default rootReducer