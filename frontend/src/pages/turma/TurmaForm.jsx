import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'

import { init } from './turmaActions'
import { TURMA_FORM } from "../consts";
import { Input } from '../../common/form/Input'
import Button from '../../common/form/Button'
import { Select } from '../../common/form/Select'
import ItemList from './ItemList'
import Summary from './Summary'

class TurmaForm extends Component {

    calculateSummary() {
        const { matriculados } = this.props

        return {
            somaDeCursando: matriculados.filter(c => c.status === 'CURSANDO').length,
            somaDeAprovado: matriculados.filter(c => c.status === 'APROVADO').length,
            somaDeReprovado: matriculados.filter(c => c.status === 'REPROVADO').length,
            somaDeDesistente: matriculados.filter(c => c.status === 'DESISTENTE').length
        }
    }

    render() {
        const { handleSubmit, readOnly, matriculados } = this.props
        const { somaDeCursando, somaDeAprovado, somaDeReprovado, 
                somaDeDesistente } = this.calculateSummary()
        return (
            // eslint-disable-next-line
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='ano' component={Input} readOnly={readOnly}
                        label='Ano' cols='12 2' placeholder='Informe o ano' />
                    <Field name='turno' component={Select} readOnly={readOnly}
                        label='Turno' cols='12 3'>
                        <option></option>
                        <option value="MATUTINO">Matutino</option>
                        <option value="VESPERTINO">Vespertino</option>
                        <option value="NOTURNO">Noturno</option>
                    </Field>
                    <Field name='tipo' component={Select} readOnly={readOnly}
                        label='Tipo' cols='12 2'>
                        <option></option>
                        <option value="EIXO">Eixo</option>
                        <option value="ANO">Série</option>
                    </Field>
                    <Field name='serie' component={Input} readOnly={readOnly}
                        label='Série' cols='12 2' type='number' />
                    <Field name='turma' component={Select} readOnly={readOnly}
                        label='Turma' cols='12 2'>
                        <option></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </Field>
                    <Summary cursando={somaDeCursando} aprovado={somaDeAprovado}
                        reprovado={somaDeReprovado} desistente={somaDeDesistente} />
                    <ItemList cols='12' list={matriculados} readOnly={readOnly}
                        field='alunos' legend='Matriculados' />
                </div>
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


TurmaForm = reduxForm({ form: TURMA_FORM, destroyOnUnmount: false })(TurmaForm)
const selector = formValueSelector(TURMA_FORM)
const mapStateToProps = state => ({ matriculados: selector(state, 'alunos') })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TurmaForm)