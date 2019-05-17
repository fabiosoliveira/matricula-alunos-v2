import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field } from 'redux-form'

import { init } from './enderecoActions'
import LabelAndInput from '../../common/form/LabelAndInput'

class EnderecoForm extends Component {

    render() {
        const { handleSubmit, readOnly } = this.props
        return (
            // eslint-disable-next-line
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='rua' component={LabelAndInput} readOnly={readOnly}
                        label='Rua' cols='12 3' placeholder='Informe a rua' />
                    <Field name='bairro' component={LabelAndInput} readOnly={readOnly}
                        label='Bairro' cols='12 3' placeholder='Informe o bairro' />
                    <Field name='cep' component={LabelAndInput} readOnly={readOnly}
                        label='CEP' cols='12 3' placeholder='Informe o cep' mask='99.999-999' />
                    <Field name='cidade' component={LabelAndInput} readOnly={readOnly}
                        label='Cidade' cols='12 3' placeholder='Informe a cidade' />
                </div>
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


EnderecoForm = reduxForm({ form: 'enderecoForm', destroyOnUnmount: false })(EnderecoForm)
const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
export default connect(null, mapDispatchToProps)(EnderecoForm)









// import React from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { reduxForm, Field } from 'redux-form'

// import { init } from './enderecoActions'
// import LabelAndInput from '../common/form/LabelAndInput'

// let EnderecoForm = (props) => {

//     const { handleSubmit, readOnly } = props
//     return (
//         // eslint-disable-next-line
//         <form role='form' onSubmit={handleSubmit}>
//             <div className='box-body'>
//                 <Field name='rua' component={LabelAndInput} readOnly={readOnly}
//                     label='Rua' cols='12 3' placeholder='Informe a rua' />
//                 <Field name='bairro' component={LabelAndInput} readOnly={readOnly}
//                     label='Bairro' cols='12 3' placeholder='Informe o bairro' />
//                 <Field name='cep' component={LabelAndInput} readOnly={readOnly}
//                     label='CEP' cols='12 3' placeholder='Informe o cep' />
//                 <Field name='cidade' component={LabelAndInput} readOnly={readOnly}
//                     label='Cidade' cols='12 3' placeholder='Informe a cidade' />
//             </div>
//             <div className='box-footer'>
//                 <button type='submit' className={`btn btn-${props.submitClass}`}>
//                     {props.submitLabel}
//                 </button>
//                 <button type='button' className='btn btn-default' onClick={props.init}>
//                     Cancelar
//                 </button>
//             </div>
//         </form>
//     )
// }


// EnderecoForm = reduxForm({ form: 'enderecoForm', destroyOnUnmount: false })(EnderecoForm)
// const mapDispatchToProps = dispatch => bindActionCreators({ init }, dispatch)
// export default connect(null, mapDispatchToProps)(EnderecoForm)
