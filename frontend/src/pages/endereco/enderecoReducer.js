import { ENDERECOS_FETCHED } from "../consts";
const INITIAL_STATE = { 
    data: {
        meta: {
            count: 0
        },
        items: []
    } 
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ENDERECOS_FETCHED:
            return { ...state, data: action.payload.data }
        default:
            return state
    }
}