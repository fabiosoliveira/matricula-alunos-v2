import React, { useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import axios from "axios";
import { getList, showUpdate, showDelete, init } from "./alunoActions";
import { BASE_URL } from "../consts";
import Button from "../../common/form/Button";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const AlunoFoto = ({ init, alunoSelected }) => {
  const [foto, setFoto] = useState(null);
  const [urlFoto, setUrlFoto] = useState(null);
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({
    aspect: 16 / 16,
    width: 200
  });

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
      const scaleX = imgRef.naturalWidth / imgRef.width;
      const scaleY = imgRef.naturalHeight / imgRef.height;

      const left = Math.round(crop.x * scaleX);
      const top = Math.round(crop.y * scaleY);
      const width = Math.round(crop.width * scaleX);
      const height = Math.round(crop.height * scaleY);

      const formData = new FormData();
      formData.append("file", foto);
      formData.append("left", left);
      formData.append("top", top);
      formData.append("width", width);
      formData.append("height", height);

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
      <div className="form-group">
        {!foto && !urlFoto && (
          <>
            <label htmlFor="upload">{alunoSelected.nome}</label>
            <input type="file" id="upload" onChange={onChangeCustom} />
            <p className="help-block">
              Escolha uma foto de perfil para o aluno.
            </p>
          </>
        )}
        {urlFoto && foto && (
          <ReactCrop
            src={urlFoto.url}
            ruleOfThirds
            onImageLoaded={image => setImgRef(image)}
            crop={crop}
            onChange={newCrop => setCrop(newCrop)}
          />
        )}
        {!foto && urlFoto && (
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
