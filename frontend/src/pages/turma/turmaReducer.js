import { TURMAS_FETCHED } from "../consts";

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
        case TURMAS_FETCHED:
            return { ...state, data: action.payload.data }
        default:
            return state
    }
}