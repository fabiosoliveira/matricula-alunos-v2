import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { init, create, update, remove } from "./turmaActions";
import List from "./TurmaList";
import Form from "./TurmaForm";
import RenderPage from "../RenderPage";

const Turma = ({ init, create, update, remove }) => {
  useEffect(() => {
    init();
  }, [init]);

  return (
    <RenderPage
      title="Turma"
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
      init,
      create,
      update,
      remove
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(Turma);
