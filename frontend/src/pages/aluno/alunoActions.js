import axios from "axios";
import commonAction from "../commonActions";
// import { initialize } from 'redux-form'
import { showTabs, selectTab } from "../../common/tab/tabActions";
import {
  BASE_URL,
  ALUNOS_FETCHED,
  ALUNO_FORM,
  TAB_FOTO,
  TAB_PRINT,
  ALUNO_SELECTED
} from "../consts";

export function getList(limit = 10, page = 1, search = "", sort = "") {
  let url = `${BASE_URL}/alunos?status__ne=INATIVO&limit=${limit}&page=${page}&sort=${sort}&nome__regex=/${search}/i`;

  const request = axios.get(url);
  return {
    type: ALUNOS_FETCHED,
    payload: request
  };
}

export function create(values) {
  return commonAction.submit(values, "post", "alunos", init);
}

export function update(values) {
  return commonAction.submit(values, "put", "alunos", init);
}

export function remove(values) {
  values.status = "INATIVO";
  return commonAction.submit(values, "patch", "alunos", init);
}

export function showUpdate(aluno) {
  return commonAction.showUpdate(aluno, ALUNO_FORM);
}

export function showDelete(aluno) {
  return commonAction.showDelete(aluno, ALUNO_FORM);
}

export function showFoto(aluno) {
  return [showTabs(TAB_FOTO), selectTab(TAB_FOTO), selectAluno(aluno)];
}

export function showPrint(aluno) {
  return [showTabs(TAB_PRINT), selectTab(TAB_PRINT), selectAluno(aluno)];
}

function selectAluno(aluno) {
  return {
    type: ALUNO_SELECTED,
    payload: {
      id: aluno._id,
      ...aluno
    }
  };
}

export function init() {
  return [...commonAction.init(ALUNO_FORM), getList()];
}
