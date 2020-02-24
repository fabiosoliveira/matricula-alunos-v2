import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { selectTab, showTabs } from "../../common/tab/tabActions";
import { create, update, remove } from "./enderecoActions";
import { TAB_LIST, TAB_CREATE } from "../consts";

import List from "./EnderecoList";
import Form from "./EnderecoForm";
import RenderPage from "../RenderPage";

const Endereco = ({ selectTab, showTabs, create, update, remove }) => {
  useEffect(() => {
    selectTab(TAB_LIST);
    showTabs(TAB_LIST, TAB_CREATE);
  }, [selectTab, showTabs]);

  return (
    <RenderPage
      title="Endereço"
      small="Cadastro"
      List={List}
      Form={Form}
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
export default connect(null, mapDispatchToProps)(Endereco);
