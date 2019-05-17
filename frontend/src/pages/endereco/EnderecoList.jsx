import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './enderecoActions'

class EnderecoList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(endereco => (
            <tr key={endereco._id}>
                <td>{endereco.rua}</td>
                <td>{endereco.bairro}</td>
                <td>{endereco.cep}</td>
                <td>{endereco.cidade}</td>
                <td>
                    <button className='btn btn-warning' onClick={() =>
                        this.props.showUpdate(endereco)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() =>
                        this.props.showDelete(endereco)}>
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
                            <th>Rua</th>
                            <th>Bairro</th>
                            <th>Cep</th>
                            <th>Cidade</th>
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

const mapStateToProps = state => ({ list: state.endereco.list })
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EnderecoList)









// import React, { useEffect } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getList, showUpdate, showDelete } from './enderecoActions'

// const EnderecoList = (props) => {

//     useEffect(() => {
//         props.getList()
//     })

//     function renderRows() {
//         const list = props.list || []
//         return list.map(endereco => (
//             <tr key={endereco._id}>
//                 <td>{endereco.rua}</td>
//                 <td>{endereco.bairro}</td>
//                 <td>{endereco.cep}</td>
//                 <td>{endereco.cidade}</td>
//                 <td>
//                     <button className='btn btn-warning' onClick={() =>
//                         props.showUpdate(endereco)}>
//                         <i className='fa fa-pencil'></i>
//                     </button>
//                     <button className='btn btn-danger' onClick={() =>
//                         props.showDelete(endereco)}>
//                         <i className='fa fa-trash-o'></i>
//                     </button>
//                 </td>
//             </tr>
//         ))
//     }

//     return (
//         <div>
//             <table className='table'>
//                 <thead>
//                     <tr>
//                         <th>Rua</th>
//                         <th>Bairro</th>
//                         <th>Cep</th>
//                         <th>Cidade</th>
//                         <th className='table-actions'>Ações</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {renderRows()}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

// const mapStateToProps = state => ({ list: state.endereco.list })
// const mapDispatchToProps = dispatch => bindActionCreators({
//     getList, showUpdate, showDelete
// }, dispatch)
// export default connect(mapStateToProps, mapDispatchToProps)(EnderecoList)
