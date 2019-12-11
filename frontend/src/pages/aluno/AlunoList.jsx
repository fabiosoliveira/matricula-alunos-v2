import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './alunoActions'
import { ButtonWarning, ButtonDanger, ButtonInfo } from "../../common/form/Button";
import DataTable from '../../common/form/Tables/DataTable'

const AlunoList = ({getList, data, showUpdate, showDelete}) => {

    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('nome')
    
    useEffect(()=>{
        getList(limit, page, search, sort)
    },[getList, limit, search, page, sort])

    const head = {
        nome: {label: 'Nome'},
        dataNascimento: {label: 'Data Nascimento'}, 
        genero: {label: 'Gênero'},
        actions: {label: 'Ações', class: 'table-actions'}
    }

    const {meta, items} = data

    const alunos = items.map(aluno => {
        const {_id, nome, dataNascimento, genero} = aluno

        return {
            key: _id,
            nome,
            dataNascimento: (dataNascimento || '')
                                    .substr(0, 10)
                                    .split('-')
                                    .reverse()
                                    .join('-'),
            genero,
            actions: <>
                <ButtonWarning onClick={() => showUpdate(aluno)} />
                <ButtonDanger onClick={() => showDelete(aluno)} />
                <ButtonInfo icon='camera' onClick={() => showDelete(aluno)} />
            </>
        }
    })

    return <DataTable 
                data={alunos} 
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

const mapStateToProps = state => ({ data: state.aluno.data })
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AlunoList)



// import React, { useEffect } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import { getList, showUpdate, showDelete } from './alunoActions'
// import { ButtonWarning, ButtonDanger } from "../../common/form/Button";

// const AlunoList = (props) => {

//     useEffect(()=>{
//         props.getList()
//     }, [props])

//     const renderRows = () => {
//         const list = props.list || []
//         return list.map(aluno => (
//             <tr key={aluno._id}>
//                 <td>{aluno.nome}</td>
//                 <td>
//                     { (aluno.dataNascimento || '')
//                         .substr(0, 10)
//                         .split('-')
//                         .reverse()
//                         .join('-') }
//                 </td>
//                 <td>{aluno.genero}</td>
//                 <td>
//                     <ButtonWarning onClick={() => props.showUpdate(aluno)} />
//                     <ButtonDanger onClick={() => props.showDelete(aluno)} />
//                 </td>
//             </tr>
//         ))
//     }

//     return (
//         <div>
//             <table className="table table-condensed">
//                 <thead>
//                     <tr>
//                         <th>Nome</th>
//                         <th>Data Nascimento</th>
//                         <th>Gênero</th>
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

// const mapStateToProps = state => ({ list: state.aluno.list })
// const mapDispatchToProps = dispatch => bindActionCreators({
//     getList, showUpdate, showDelete
// }, dispatch)
// export default connect(mapStateToProps, mapDispatchToProps)(AlunoList)
