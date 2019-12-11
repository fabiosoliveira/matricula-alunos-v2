import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, Fields } from 'redux-form'

import { init } from './alunoActions'
import Input, { dateFormatter } from '../../common/form/Input'
import Button from '../../common/form/Button'
import { Select, SelectBusca } from "../../common/form/Select";
import { BoxWithToolsAndBorder } from '../../common/form/Box'
import { ALUNO_FORM, BASE_URL } from "../consts";
import { cpfMask, phoneMask, susMask } from "../../common/utils/masksFild";
import Modal from '../../common/form/Modal'

const loadOptionsEndereco = {
    ajax: {
        delay: 1000,
        url: function (params) {
            return `${BASE_URL}/enderecos?select=endereco&endereco__regex=/${params.term}/i`
        },
        processResults: function (data) {
            return {
                results: data.items.map(endereco => (
                    {
                        id: endereco._id,
                        text: endereco.endereco
                    }
                ))
            };
        }
    }
}

class AlunoForm extends Component {

    componentWillUnmount() {
        const { selected } = this.props.tab
        if (selected === 'tabUpdate' || selected === 'tabDelete') {
            this.props.init()
        }
    }

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            // eslint-disable-next-line
            <form role='form' onSubmit={handleSubmit}>
                <Modal />
                <BoxWithToolsAndBorder title='Dados pessoais' visivel={true}>
                    <div className="row">
                        <Field name='nome' component={Input} readOnly={readOnly}
                            label='Nome' cols='12 3' placeholder='Informe o nome' />
                        <Field name='dataNascimento' component={Input} readOnly={readOnly}
                            label='Data de Nascimento' cols='12 3' type='date' icon='calendar'
                            format={dateFormatter} />
                        <Field name='cor' component={Select} readOnly={readOnly}
                            label='Cor' cols='12 3'>
                            <option></option>
                            <option value="BRANCO">Branco</option>
                            <option value="NEGRO">Negro</option>
                            <option value="PARDO">Pardo</option>
                        </Field>
                        <Field name='genero' component={Select} readOnly={readOnly}
                            label='Genero' cols='12 3'>
                            <option></option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMININO">Feminino</option>
                        </Field>
                    </div>
                    <div className="row">
                        <Field name='telefone' component={Input} readOnly={readOnly}
                            label='Telefone' cols='12 3' type='tel' icon='phone' {...phoneMask} />
                        <Field name='numeroSus' component={Input} readOnly={readOnly}
                            label='SUS' cols='12 3' placeholder='Informe o número do SUS' {...susMask} />
                        <Field name='cpf' component={Input} readOnly={readOnly}
                            label='CPF' cols='12 3' {...cpfMask} />
                        <Field name='status' component={Select} readOnly={readOnly}
                            label='Status' cols='12 3'>
                            <option></option>
                            <option value="ATIVO">Ativo</option>
                            <option value="INATIVO">Inativo</option>
                            <option value="MATRICULADO">Matriculado</option>
                        </Field>
                    </div>
                    <div className="row">
                        <Fields names={['endereco.id', 'endereco.endereco']} component={SelectBusca} readOnly={readOnly}
                            label='Endereço' cols='12 6' icon='search' loadOptions={loadOptionsEndereco} />
                    </div>
                </BoxWithToolsAndBorder>

                {/* Documento RG */}
                <BoxWithToolsAndBorder title='Documentos' visivel={false}>
                    <div className="row">
                        <Field name='rg.numeroRegistro' component={Input} readOnly={readOnly}
                            label='RG' cols='12 3' placeholder='Informe o número do RG' />
                        <Field name='rg.dataEspedicao' component={Input} readOnly={readOnly}
                            label='Data Expedição' cols='12 3' type='date' icon='calendar'
                            format={dateFormatter} />
                        <Field name='rg.emissor' component={Input} readOnly={readOnly}
                            label='Emissor' cols='12 3' placeholder='Informe o Emissor do RG' />
                    </div>
                    <div className="row">
                        <Field name='rg.nomePai' component={Input} readOnly={readOnly}
                            label='Nome do pai' cols='12 6' placeholder='Informe o nome do pai' />
                        <Field name='rg.nomeMae' component={Input} readOnly={readOnly}
                            label='Nome da Mãe' cols='12 6' placeholder='Informe o nome da Mãe' />
                    </div>
                </BoxWithToolsAndBorder>

                {/* Responsável */}
                <BoxWithToolsAndBorder title='Responsável'>
                    <Field name='responsavel.nome' component={Input} readOnly={readOnly}
                        label='Nome' cols='12 3' placeholder='Informe o nome' />
                    <Field name='responsavel.parentesco' component={Input} readOnly={readOnly}
                        label='Parentesco' cols='12 3' placeholder='Ex.: pai, mãe, tio, etc...' />
                    <Field name='responsavel.cpf' component={Input} readOnly={readOnly}
                        label='CPF' cols='12 3' {...cpfMask} />
                    {/* Documento RG do Responsável */}
                    <Field name='responsavel.rg.numeroRegistro' component={Input} readOnly={readOnly}
                        label='RG' cols='12 3' placeholder='Informe o número do RG' />
                    <Field name='responsavel.rg.dataEspedicao' component={Input} readOnly={readOnly}
                        label='Data Expedição' cols='12 3' type='date' icon='calendar'
                        format={dateFormatter} />
                    <Field name='responsavel.rg.emissor' component={Input} readOnly={readOnly}
                        label='Emissor' cols='12 3' placeholder='Informe o Emissor do RG' />
                    <Field name='responsavel.rg.nomePai' component={Input} readOnly={readOnly}
                        label='Nome do pai' cols='12 3' placeholder='Informe o nome do pai' />
                    <Field name='responsavel.rg.nomeMae' component={Input} readOnly={readOnly}
                        label='Nome da Mãe' cols='12 3' placeholder='Informe o nome da Mãe' />
                </BoxWithToolsAndBorder>

                {/* Quiz */}
                <BoxWithToolsAndBorder title='Quiz'>
                    <Field name='quiz.onibusEscolar' component={Select} readOnly={readOnly}
                        label='Usa Transporte escolar' cols='12 6'>
                        <option></option>
                        <option value="SIM">Sim</option>
                        <option value="NAO">Não</option>
                    </Field>
                    <Field name='quiz.procedimentoEscolar' component={Select} readOnly={readOnly}
                        label='Procedimento Escolar' cols='12 6'>
                        <option></option>
                        <option value="CHAMAR-RESPONSAVEL">ligar para o responsável e aguardar na unidade escolar</option>
                        <option value="LEVAR-AO-HOSPITAL">levar ao hospital e solicitar acompanhamento do responsável</option>
                    </Field>
                    <Field name='quiz.necessidadeEspecial' component={Input} readOnly={readOnly}
                        label='Necessidade especial' cols='12 6' placeholder='Informe alguma necessidade especial caso possua' />
                    <Field name='quiz.tratamentoEspecial' component={Input} readOnly={readOnly}
                        label='Tratamento especial' cols='12 6' placeholder='Informe alguma tratamento especial que esteja fazendo' />
                    <Field name='quiz.algumaAlergia' component={Input} readOnly={readOnly}
                        label='Alergias' cols='12 6' placeholder='Informe as alergias que tenha' />
                    <Field name='quiz.algumMedicamentoContinuado' component={Input} readOnly={readOnly}
                        label='Medicamento continuado' cols='12 6' placeholder='Informe os medicamentos continuados' />
                </BoxWithToolsAndBorder>
                <div className='box-footer'>
                    <Button type='submit' option={this.props.submitClass}>
                        {this.props.submitLabel}
                    </Button>
                    <Button onClick={this.props.init}>
                        Cancelar
                    </Button>
                </div>
            </form>
        )
    }
}


AlunoForm = reduxForm({ form: ALUNO_FORM, destroyOnUnmount: false })(AlunoForm)
const mapStateToProps = state => ({ alunoForm: state.form[ALUNO_FORM], tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AlunoForm)
