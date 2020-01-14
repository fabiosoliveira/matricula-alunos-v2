import { ALUNOS_FETCHED, ALUNO_SELECTED } from "../consts";
const INITIAL_STATE = {
  data: {
    meta: {
      count: 0
    },
    items: []
  },
  alunoSelected: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ALUNOS_FETCHED:
      return { ...state, data: action.payload.data };
    case ALUNO_SELECTED:
      return { ...state, alunoSelected: action.payload };
    default:
      return state;
  }
};
