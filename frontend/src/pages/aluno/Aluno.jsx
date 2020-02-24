import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { selectTab, showTabs } from "../../common/tab/tabActions";
import { create, update, remove } from "./alunoActions";
import { TAB_LIST, TAB_CREATE } from "../consts";

import List from "./AlunoList";
import Form from "./AlunoForm";
import Foto from "./AlunoFoto";
import Print from "./AlunoPrint";
import RenderPage from "../RenderPage";

const Aluno = ({ selectTab, showTabs, create, update, remove }) => {
  useEffect(() => {
    selectTab(TAB_LIST);
    showTabs(TAB_LIST, TAB_CREATE);
  }, [selectTab, showTabs]);

  return (
    <RenderPage
      title="Aluno"
      small="Cadastro"
      List={List}
      Form={Form}
      Foto={Foto}
      Print={Print}
      create={create}
      update={update}
      remove={remove}
    />
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectTab,
      showTabs,
      create,
      update,
      remove
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(Aluno);
