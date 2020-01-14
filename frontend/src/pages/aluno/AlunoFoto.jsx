import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import axios from "axios";
import { getList, showUpdate, showDelete, init } from "./alunoActions";
import { BASE_URL } from "../consts";

import Button from "../../common/form/Button";

const AlunoFoto = ({ init, alunoSelected }) => {
  const [foto, setFoto] = useState(null);
  const [urlFoto, setUrlFoto] = useState(null);

  function onChangeCustom(e) {
    const inputFile = e.target.files[0];
    setFoto(inputFile);
    setUrlFoto({ url: URL.createObjectURL(inputFile) });
  }

  async function remover() {
    const aluno = await axios.patch(`${BASE_URL}/alunos/${alunoSelected.id}`, {
      foto: ""
    });
    if (aluno) {
      await axios.delete(`${BASE_URL}/fotos/${urlFoto._id}`);
    }
    setUrlFoto(null);
    setFoto(null);
  }

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(`${BASE_URL}/alunos/${alunoSelected.id}`);
      if (result.data.foto) {
        setUrlFoto(result.data.foto);
      }
    }

    fetchData();
  }, [alunoSelected.id]);

  async function onSubmitCustom(e) {
    e.preventDefault();
    if (foto) {
      const formData = new FormData();
      formData.append("file", foto);
      const dataFoto = await axios.post(`${BASE_URL}/fotos`, formData);
      const dataAluno = await axios.patch(
        `${BASE_URL}/alunos/${alunoSelected.id}`,
        { foto: dataFoto.data }
      );
      if (dataAluno.data) {
        toastr.success("Sucesso", "Operação Realizada com sucesso.");
        init();
      } else {
        e.response.data.errors.forEach(error =>
          toastr.error("Erro", error.message)
        );
      }
    }
  }

  return (
    <form action="" onSubmit={onSubmitCustom}>
      <div class="form-group">
        {!foto && !urlFoto && (
          <>
            <label for="upload">{alunoSelected.nome}</label>
            <input type="file" id="upload" onChange={onChangeCustom} />
            <p class="help-block">Escolha uma foto de perfil para o aluno.</p>
          </>
        )}
        {urlFoto && (
          <img
            alt="..."
            src={urlFoto.url}
            id="foto"
            className="img-thumbnail center-block"
          />
        )}
      </div>
      {foto && (
        <Button type="submit" option="info">
          Alterar
        </Button>
      )}
      {!foto && urlFoto && (
        <Button onClick={remover} option="danger">
          Remover
        </Button>
      )}
      {<Button onClick={init}>Cancelar</Button>}
    </form>
  );
};

const mapStateToProps = state => ({ alunoSelected: state.aluno.alunoSelected });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getList,
      showUpdate,
      showDelete,
      init
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AlunoFoto);
