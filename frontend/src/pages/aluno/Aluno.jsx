import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { selectTab, showTabs } from "../../common/tab/tabActions";
import { create, update, remove } from "./alunoActions";
import { TAB_LIST, TAB_CREATE } from "../consts";

import List from "./AlunoList";
import Form from "./AlunoForm";
import Foto from "./AlunoFoto";
import RenderPage from "../RenderPage";

class Aluno extends Component {
  componentWillMount() {
    this.props.selectTab(TAB_LIST);
    this.props.showTabs(TAB_LIST, TAB_CREATE);
  }

  render() {
    const params = {
      title: "Aluno",
      small: "Cadastro",
      List,
      Form,
      Foto,
      create: this.props.create,
      update: this.props.update,
      remove: this.props.remove
    };

    return <RenderPage {...params} />;
  }
}

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
