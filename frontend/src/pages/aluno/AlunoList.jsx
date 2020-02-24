import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getList,
  showUpdate,
  showDelete,
  showFoto,
  showPrint
} from "./alunoActions";
import {
  Button,
  ButtonWarning,
  ButtonDanger,
  ButtonInfo
} from "../../common/form/Button";
import DataTable from "../../common/form/Tables/DataTable";

const AlunoList = ({
  getList,
  data,
  showUpdate,
  showDelete,
  showFoto,
  showPrint
}) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nome");

  useEffect(() => {
    getList(limit, page, search, sort);
  }, [getList, limit, search, page, sort]);

  const head = {
    nome: { label: "Nome" },
    dataNascimento: { label: "Data Nascimento" },
    genero: { label: "Gênero" },
    actions: { label: "Ações", class: "table-actions" }
  };

  const { meta, items } = data;

  const alunos = items.map(aluno => {
    const { _id, nome, dataNascimento, genero } = aluno;

    return {
      key: _id,
      nome,
      dataNascimento: (dataNascimento || "")
        .substr(0, 10)
        .split("-")
        .reverse()
        .join("-"),
      genero,
      actions: (
        <>
          <ButtonWarning onClick={() => showUpdate(aluno)} />
          <ButtonDanger onClick={() => showDelete(aluno)} />
          <ButtonInfo icon="camera" onClick={() => showFoto(aluno)} />
          <Button icon="print" onClick={() => showPrint(aluno)} />
        </>
      )
    };
  });

  return (
    <DataTable
      data={alunos}
      head={head}
      limit={limit}
      setLimit={setLimit}
      page={page}
      setPage={setPage}
      setSearch={setSearch}
      setSort={setSort}
      count={meta.count}
    />
  );
};

const mapStateToProps = state => ({ data: state.aluno.data });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getList,
      showUpdate,
      showDelete,
      showFoto,
      showPrint
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AlunoList);
