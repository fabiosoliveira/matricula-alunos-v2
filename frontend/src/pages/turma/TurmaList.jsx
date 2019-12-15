import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './turmaActions'
import { ButtonWarning, ButtonDanger } from "../../common/form/Button";
import DataTable from '../../common/form/Tables/DataTable';

const TurmaList = ({getList, data, showUpdate, showDelete}) => {

    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('nome')
    
    useEffect(()=>{
        getList(limit, page, search, sort)
    },[getList, limit, search, page, sort])

    const head = {
        nome: {label: 'Nome'},
        ano: {label: 'Ano'}, 
        turno: {label: 'Turno'},
        tipo: {label: 'Tipo'},
        serie: {label: 'Série'},
        turma: {label: 'Turma'},
        actions: {label: 'Ações', class: 'table-actions'}
    }

    const {meta, items} = data

    const turmas = items.map(turma => {
        const {_id, nome, ano, turno, tipo, serie, turma: t} = turma

        return {
            key: _id,
            nome,
            ano, 
            turno,
            tipo,
            serie,
            turma: t,
            actions: <>
                <ButtonWarning onClick={() => showUpdate(turma)} />
                <ButtonDanger onClick={() => showDelete(turma)} />
            </>
        }
    })

    return <DataTable 
                data={turmas} 
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

const mapStateToProps = state => ({ data: state.turma.data })
const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TurmaList)
