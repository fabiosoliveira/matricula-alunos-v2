import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './enderecoActions'
import { ButtonWarning, ButtonDanger } from "../../common/form/Button";
import DataTable from '../../common/form/Tables/DataTable';

const EnderecoList = ({getList, data, showUpdate, showDelete}) => {

    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('rua')
    
    useEffect(()=>{
        getList(limit, page, search, sort)
    },[getList, limit, search, page, sort])

    const head = {
        rua: {label: 'Rua'},
        bairro: {label: 'Bairro'}, 
        cep: {label: 'Cep'},
        cidade: {label: 'Cidade'},
        actions: {label: 'Ações', class: 'table-actions'}
    }

    const {meta, items} = data

    const enderecos = items.map(endereco => {
        const {_id, rua, bairro, cep, cidade} = endereco

        return {
            key: _id,
            rua,
            bairro,
            cep,
            cidade,
            actions: <>
                <ButtonWarning onClick={() => showUpdate(endereco)} />
                <ButtonDanger onClick={() => showDelete(endereco)} />
            </>
        }
    })

    return <DataTable
                data={enderecos} 
                head={head} 
                limit={limit}
                setLimit={setLimit} 
                page={page}
                setPage={setPage}
                setSearch={setSearch}
                setSort={setSort}
                count={meta.count}
            />
}

const mapStateToProps = state => ({ data: state.endereco.data })
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EnderecoList)



// import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getList, showUpdate, showDelete } from './enderecoActions'
// import { ButtonWarning, ButtonDanger } from "../../common/form/Button";

// class EnderecoList extends Component {

//     componentWillMount() {
//         this.props.getList()
//     }

//     renderRows() {
//         const list = this.props.list || []
//         return list.map(endereco => (
//             <tr key={endereco._id}>
//                 <td>{endereco.rua}</td>
//                 <td>{endereco.bairro}</td>
//                 <td>{endereco.cep}</td>
//                 <td>{endereco.cidade}</td>
//                 <td>
//                     <ButtonWarning onClick={() => this.props.showUpdate(endereco)} />
//                     <ButtonDanger onClick={() => this.props.showDelete(endereco)} />
//                 </td>
//             </tr>
//         ))
//     }

//     render() {
//         return (
//             <div>
//                 <table className='table table-condensed'>
//                     <thead>
//                         <tr>
//                             <th>Rua</th>
//                             <th>Bairro</th>
//                             <th>Cep</th>
//                             <th>Cidade</th>
//                             <th className='table-actions'>Ações</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.renderRows()}
//                     </tbody>
//                 </table>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => ({ list: state.endereco.list })
// const mapDispatchToProps = dispatch => bindActionCreators({
//     getList, showUpdate, showDelete
// }, dispatch)
// export default connect(mapStateToProps, mapDispatchToProps)(EnderecoList)
