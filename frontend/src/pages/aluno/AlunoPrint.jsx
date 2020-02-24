import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { init } from "./alunoActions";
import Button from "../../common/form/Button";

import "./AlunoPrint.css";
import jorje from "../../assets/img/jorje_amado.png";
import pmj from "../../assets/img/pmj.png";

const AlunoPrint = ({ init, alunoSelected }) => {
  function calculaIdade(data_nascimento) {
    let nascimento = new Date(data_nascimento);
    let hoje = new Date();
    return Math.floor(
      Math.ceil(
        Math.abs(nascimento.getTime() - hoje.getTime()) / (1000 * 3600 * 24)
      ) / 365.25
    );
  }

  function header() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <div>
            <img src={jorje} alt="" />
          </div>
          <div className="text-center">
            <p className="mb-0">SECRETARIA MUNICIPAL DA EDUCAÇÃO</p>
            <p className="mb-0">ESCOLA MUNICIPALIZADA REUNIDAS CASTRO ALVES</p>
            <p className="mb-0">
              Avenida Presidente Vargas, 83 - centro - Jiquiriçá-Ba
            </p>
            <p className="mb-0">Email: erca2018@outlook.pt</p>
          </div>
          <div>
            <img src={pmj} alt="" />
          </div>
        </div>
        <h1 className="text-center mt-5 h1Style">
          FICHA DE MATRICULA - {new Date().getFullYear()}
        </h1>
      </div>
    );
  }

  //   function footer() {
  //     return (
  //       <div className="assinatura text-center">
  //         <p>{aluno.nome}</p>
  //       </div>
  //     );
  //   }

  function tabelaSerie() {
    let ano = new Date().getFullYear();
    const rows = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
      <table className="tbSerie">
        <thead>
          <tr>
            <th className="tbSerieThTd">ANO</th>
            <th className="tbSerieThTd">TURMA</th>
            <th className="tbSerieThTd">TURNO</th>
            <th className="tbSerieThTd">ASSINATURA DO RESPONSÁVEL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(number => {
            return (
              <tr key={number}>
                <td className="tbSerieThTd">{ano++}</td>
                <td className="tbSerieThTd"></td>
                <td className="tbSerieThTd"></td>
                <td className="tbSerieThTd"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      {header()}

      <div className="media imprimir">
        <div className="media-left">
          {alunoSelected.foto && (
            <img
              className="media-object align-self-start mr-3"
              src={alunoSelected.foto.url}
              alt="Foto"
            />
          )}
        </div>

        <div className="media-body">
          <h3 className="media-heading mt-0">Dados do aluno</h3>
          <div className="container">
            <div className="div-row row">
              <div className="col-md-6">
                <b>NOME:</b> {alunoSelected.nome}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-6">
                <b>D. NASCIMENTO:</b>{" "}
                {alunoSelected.dataNascimento
                  .substr(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
              <div className="col-md-6">
                <b>IDADE:</b> {calculaIdade(alunoSelected.dataNascimento)}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-6">
                <b>SEXO:</b> {alunoSelected.genero}
              </div>
              <div className="col-md-6">
                <b>COR:</b> {alunoSelected.cor}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-6">
                <b>ENDEREÇO:</b> {alunoSelected.endereco.endereco}
              </div>
            </div>

            <div className="div-row row">
              <div className="col-md-6">
                <b>CPF:</b> {alunoSelected.cpf}
              </div>
              <div className="col-md-6">
                <b>RG:</b> {alunoSelected.rg.numeroRegistro}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-6">
                <b>D. EXPEDIÇÃO:</b>{" "}
                {alunoSelected.rg.dataEspedicao
                  .substr(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </div>
              <div className="col-md-6">
                <b>ÓRGÃO EMISSOR:</b> {alunoSelected.rg.emissor}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-6">
                <b>CONTATO:</b> {alunoSelected.telefone}
              </div>
              <div className="col-md-6">
                <b>CARTÃO SUS:</b> {alunoSelected.numeroSus}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-6">
                <b>RESPONSÁVEL "{alunoSelected.responsavel.parentesco}":</b>{" "}
                {alunoSelected.responsavel.nome}
              </div>
              <div className="col-md-6">
                <b>RG/CPF:</b> {alunoSelected.responsavel.rg.numeroRegistro}
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-6">
                <b>MÃE:</b> {alunoSelected.nome_da_mãe}
              </div>
              <div className="col-md-6">
                <b>RG/CPF:</b> {alunoSelected.RG_CPF_da_mãe}
              </div>
            </div> */}

            <div className="div-row row">
              <div className="col-md-12">
                <b>UTILIZA TRANSPORTE ESCOLAR:</b>
                {alunoSelected.quiz.onibusEscolar ? "SIM" : "NÃO"}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-12">
                <b>ALGUMA NECESSIDADE ESPECIAL?:</b>
                {alunoSelected.quiz.necessidadeEspecial
                  ? alunoSelected.quiz.necessidadeEspecial
                  : "NÃO"}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-12">
                <b>FAZ TRATAMENTO ESPECIALIZADO?:</b>
                {alunoSelected.quiz.tratamentoEspecial
                  ? alunoSelected.quiz.tratamentoEspecial
                  : "NÃO"}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-12">
                <b>TEM ALGUM TIPO DE ALERGIA?:</b>
                {alunoSelected.quiz.algumaAlergia
                  ? alunoSelected.quiz.algumaAlergia
                  : "NÃO"}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-12">
                <b>UTILIZA ALGUM REMÉDIO CONTÍNUO?:</b>
                {alunoSelected.quiz.algumMedicamentoContinuado
                  ? alunoSelected.quiz.algumMedicamentoContinuado
                  : "NÃO"}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-12">
                <b>
                  EM CASO DE PASSAR MAL NA ESCOLA, QUAL PROCEDIMENTO A SER
                  TOMADO?:
                </b>
                <br /> {alunoSelected.quiz.procedimentoEscolar}
              </div>
            </div>
            <div className="div-row row">
              <div className="col-md-12">{tabelaSerie()}</div>
            </div>
          </div>
        </div>
      </div>
      {/* {this.footer()} */}
      <Button onClick={init}>Voltar</Button>
    </div>
  );
};

const mapStateToProps = state => ({ alunoSelected: state.aluno.alunoSelected });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      //   getList,
      //   showUpdate,
      //   showDelete,
      init
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AlunoPrint);
