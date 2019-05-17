import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './alunoActions'

class AlunoList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    formatDate(date) {
        let newDate = new Date(date)
        return `${newDate.getDate() + 1}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(aluno => (
            <tr key={aluno._id}>
                <td>{aluno.nome}</td>
                <td>
                    {this.formatDate(aluno.dataNascimento)}
                </td>
                <td>{aluno.genero}</td>
                <td>
                    <button className='btn btn-warning' onClick={() =>
                        this.props.showUpdate(aluno)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() =>
                        this.props.showDelete(aluno)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Data Nascimento</th>
                            <th>Gênero</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({ list: state.aluno.list })
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AlunoList)
