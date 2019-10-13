import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { init, create, update, remove } from './turmaActions'
import List from './TurmaList'
import Form from './TurmaForm'
import RenderPage from '../RenderPage';

class Turma extends Component {

    componentWillMount() {
        this.props.init()
    }

    render() {
        const params = { 
            title: 'Turma', 
            small: 'Cadastro', 
            List, Form, 
            create: this.props.create, 
            update: this.props.update, 
            remove: this.props.remove 
        }

        return <RenderPage {...params} />
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    init, create, update, remove
}, dispatch)
export default connect(null, mapDispatchToProps)(Turma)
