import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './enderecoActions'
import { Input } from '../../common/form/Input'
import Button from '../../common/form/Button'
import { ENDERECO_FORM } from "../consts";
import { cepMask } from "../../common/utils/masksFild";

class EnderecoForm extends Component {

    componentWillUnmount(){
        const { selected } = this.props.tab
        if(selected === 'tabUpdate' || selected === 'tabDelete'){
            this.props.init()
        }
    }

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            // eslint-disable-next-line
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='rua' component={Input} readOnly={readOnly}
                        label='Rua' cols='12 3' placeholder='Informe a rua' />
                    <Field name='bairro' component={Input} readOnly={readOnly}
                        label='Bairro' cols='12 3' placeholder='Informe o bairro' />
                    <Field name='cep' component={Input} readOnly={readOnly}
                        label='CEP' cols='12 3' {...cepMask} />
                    <Field name='cidade' component={Input} readOnly={readOnly}
                        label='Cidade' cols='12 3' placeholder='Informe a cidade' />
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

EnderecoForm = reduxForm({ form: ENDERECO_FORM, destroyOnUnmount: false })(EnderecoForm)
const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EnderecoForm)
