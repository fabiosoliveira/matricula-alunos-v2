import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'

import { init } from './alunoActions'
import LabelAndInput from '../../common/form/LabelAndInput'
import LabelAndSelect from '../../common/form/LabelAndSelect'
import LabelAndInputIcon from '../../common/form/LabelAndInputIcon';
import Box from '../../common/form/Box'
import LabelAndInputBuscaIcon from '../../common/form/LabelAndInputBuscaIcon';

class AlunoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pesquisa: 'ddd',
            enderecos: []
        }
    }

    componentWillMount() {
        let URL = 'http://localhost:3003/api/enderecos/'
        URL += `?select=endereco&endereco__regex=/${this.state.pesquisa}/`
        axios.get(URL)
            .then(resp => this.setState({ enderecos: resp.data }))
    }

    renderOptionsEndereco(enderecos) {
        return (
            <>  
                {enderecos.map(endereco =>
                    <option key={endereco._id} value={endereco._id}>
                        {endereco.endereco}
                    </option>
                )}
            </>
        )
    }

    handlerPesquisa(campo) {
        this.setState({ pesquisa: campo })
    }

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            // eslint-disable-next-line
            <form role='form' onSubmit={handleSubmit}>
                <Box title='Dados pessoais' visivel={true}>
                    <Field name='nome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 3' placeholder='Informe o nome' />
                    <Field name='dataNascimento' component={LabelAndInputIcon} readOnly={readOnly}
                        label='Data de Nascimento' cols='12 3' type='date' icon='calendar' />
                    <Field name='cor' component={LabelAndSelect} readOnly={readOnly}
                        label='Cor' cols='12 3'>
                        <option></option>
                        <option value="BRANCO">Branco</option>
                        <option value="NEGRO">Negro</option>
                        <option value="PARDO">Pardo</option>
                    </Field>
                    <Field name='genero' component={LabelAndSelect} readOnly={readOnly}
                        label='Genero' cols='12 3'>
                        <option></option>
                        <option value="MASCULINO">Masculino</option>
                        <option value="FEMININO">Feminino</option>
                    </Field>
                    <Field name='telefone' component={LabelAndInputIcon} readOnly={readOnly}
                        label='Telefone' cols='12 3' type='text' icon='phone'
                        placeholder='Informe o telefone' mask="(99) 99999-9999" />
                    <Field name='numeroSus' component={LabelAndInput} readOnly={readOnly}
                        label='SUS' cols='12 3' placeholder='Informe o número do SUS' />
                    <Field name='cpf' component={LabelAndInput} readOnly={readOnly}
                        label='CPF' cols='12 3' placeholder='Informe o número do CPF' mask="999.999.999-99" />
                    <Field name='endereco.id' component={LabelAndInputBuscaIcon} readOnly={readOnly}
                        label='Endereço' cols='12 6'
                        pesquisa={campo => this.handlerPesquisa(campo)}
                        value={this.state.pesquisa}>
                            {this.renderOptionsEndereco(this.state.enderecos)}
                    </Field>
                    <Field name='status' component={LabelAndSelect} readOnly={readOnly}
                        label='Status' cols='12 3'>
                        <option></option>
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                        <option value="MATRICULADO">Matriculado</option>
                    </Field>
                </Box>

                {/* Documento RG */}
                <Box title='Documentos'>
                    <Field name='rg.numeroRegistro' component={LabelAndInput} readOnly={readOnly}
                        label='RG' cols='12 3' placeholder='Informe o número do RG' />
                    <Field name='rg.dataEspedicao' component={LabelAndInputIcon} readOnly={readOnly}
                        label='Data Expedição' cols='12 3' type='date' icon='calendar' />
                    <Field name='rg.emissor' component={LabelAndInput} readOnly={readOnly}
                        label='Emissor' cols='12 3' placeholder='Informe o Emissor do RG' />
                    <Field name='rg.nomePai' component={LabelAndInput} readOnly={readOnly}
                        label='Nome do pai' cols='12 6' placeholder='Informe o nome do pai' />
                    <Field name='rg.nomeMae' component={LabelAndInput} readOnly={readOnly}
                        label='Nome da Mãe' cols='12 6' placeholder='Informe o nome da Mãe' />
                </Box>

                {/* Responsável */}
                <Box title='Responsável'>
                    <Field name='responsavel.nome' component={LabelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 3' placeholder='Informe o nome' />
                    <Field name='responsavel.parentesco' component={LabelAndInput} readOnly={readOnly}
                        label='Parentesco' cols='12 3' placeholder='Ex.: pai, mãe, tio, etc...' />
                    <Field name='responsavel.cpf' component={LabelAndInput} readOnly={readOnly}
                        label='CPF' cols='12 3' placeholder='Informe o número do CPF' mask="999.999.999-99" />
                    {/* Documento RG do Responsável */}
                    <Field name='responsavel.rg.numeroRegistro' component={LabelAndInput} readOnly={readOnly}
                        label='RG' cols='12 3' placeholder='Informe o número do RG' />
                    <Field name='responsavel.rg.dataEspedicao' component={LabelAndInputIcon} readOnly={readOnly}
                        label='Data Expedição' cols='12 3' type='date' icon='calendar' />
                    <Field name='responsavel.rg.emissor' component={LabelAndInput} readOnly={readOnly}
                        label='Emissor' cols='12 3' placeholder='Informe o Emissor do RG' />
                    <Field name='responsavel.rg.nomePai' component={LabelAndInput} readOnly={readOnly}
                        label='Nome do pai' cols='12 3' placeholder='Informe o nome do pai' />
                    <Field name='responsavel.rg.nomeMae' component={LabelAndInput} readOnly={readOnly}
                        label='Nome da Mãe' cols='12 3' placeholder='Informe o nome da Mãe' />
                </Box>

                {/* Quiz */}
                <Box title='Quiz'>
                    <Field name='quiz.onibusEscolar' component={LabelAndSelect} readOnly={readOnly}
                        label='Usa Transporte escolar' cols='12 6'>
                        <option></option>
                        <option value="SIM">Sim</option>
                        <option value="NÃO">Não</option>
                    </Field>
                    <Field name='quiz.procedimentoEscolar' component={LabelAndSelect} readOnly={readOnly}
                        label='Procedimento Escolar' cols='12 6'>
                        <option></option>
                        <option value="CHAMAR-RESPONSAVEL">ligar para o responsável e aguardar na unidade escolar</option>
                        <option value="LEVAR-AO-HOSPITAL">levar ao hospital e solicitar acompanhamento do responsável</option>
                    </Field>
                    <Field name='quiz.necessidadeEspecial' component={LabelAndInput} readOnly={readOnly}
                        label='Necessidade especial' cols='12 6' placeholder='Informe alguma necessidade especial caso possua' />
                    <Field name='quiz.tratamentoEspecial' component={LabelAndInput} readOnly={readOnly}
                        label='Tratamento especial' cols='12 6' placeholder='Informe alguma tratamento especial que esteja fazendo' />
                    <Field name='quiz.algumaAlergia' component={LabelAndInput} readOnly={readOnly}
                        label='Alergias' cols='12 6' placeholder='Informe as alergias que tenha' />
                    <Field name='quiz.algumMedicamentoContinuado' component={LabelAndInput} readOnly={readOnly}
                        label='Medicamento continuado' cols='12 6' placeholder='Informe os medicamentos continuados' />
                </Box>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>
                        Cancelar
                    </button>
                </div>
            </form>
        )
    }
}


AlunoForm = reduxForm({ form: 'alunoForm', destroyOnUnmount: false })(AlunoForm)
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(null, mapDispatchToProps)(AlunoForm)
