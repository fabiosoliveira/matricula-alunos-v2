/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useMemo} from 'react'
import _ from 'lodash'
import If from '../../../operator/If'
import './index.css'

const getInitialValues = (data) => {
    const keys = Object.keys(data)

    const headers = {}
    keys.forEach(value => {
        headers[value] =  !_.isEmpty(headers) ? 'sort' : 'sort-by-attributes'
    })
    return [keys, headers]
}

const DataTable = ({ data, head = {}, limit, setLimit, page, setPage, setSearch, setSort, count }) => {
    const [keys, glyph] = useMemo(() => getInitialValues(head), [head])
    const [glyphicon, setGlyphicon] = useState(glyph)

    const handleSort = key => {
        const glyphCase = {}
        Object.keys(glyphicon).forEach(key => glyphCase[key]= 'sort')

        switch (glyphicon[key]) {
            case 'sort':
            case 'sort-by-attributes-alt':
                setGlyphicon({...glyphCase, [key]: 'sort-by-attributes'})
                setSort(key)
                break;
                
            case 'sort-by-attributes':
                setGlyphicon({...glyphCase, [key]: 'sort-by-attributes-alt'})
                setSort('-' + key)
                break;
                
            default:
                setGlyphicon({...glyphCase, [key]: 'sort'})
                break;
        }
    }

    const handlePage = page => e => {
        e.preventDefault()
        setPage(page)
    }

    const renderRow = record => {
        return (
            <tr key={record.key}>
                {
                    keys.map(key => <td key={key}>{record[key]}</td>)
                }
            </tr>
        )
    }

    const renderHeader = header => (
        <th className={head[header].class} key={header}>
            <div className='flex-between' onClick={() => handleSort(header)}>
                {head[header].label || header}
                <span className={`glyphicon glyphicon-${glyphicon[header]}`}></span>
            </div>
        </th>
    )

    const renderFooter = footer => (
        <th className={head[footer].class} key={footer}>
                {head[footer].label || footer}
        </th>
    )
    
    const isLimitPreview = page <= 1
    const lastPage = Math.round(count/limit)
    const isLimitNext = (page + 1) > lastPage

    let pages = []
    for(let i = 1; i <= lastPage; i++){
        const isCurrent = (i === page)
        pages.push(
            <li key={i} className={isCurrent ? "active" : ""}>
                <a href="#" onClick={handlePage(i)}>
                    {i} {isCurrent && <span className="sr-only">(current)</span>}
                </a>
            </li>
        )
    }

    return (
        <div>
            <form className='flex-between table-options form-inline'>
                <div>
                    <span>Show </span>
                    <select className='form-control' 
                        onChange={e => setLimit(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span> entries</span>
                </div>
                <div>
                    Search: <input className='form-control' 
                        onChange={e => setSearch(e.target.value)} />
                </div>
            </form>
            <table className="table table-condensed">
                <thead>
                    <tr>
                        {keys.map(renderHeader)}
                    </tr>
                </thead>
                <If test={data.length === 0}>
                    <p className='centralizado'>Nenhum registro correspondente encontrado</p>
                </If>
                <tbody>
                    {data.map(renderRow)}
                </tbody>
                <tfoot>
                    <tr>    
                        {keys.map(renderFooter)}
                    </tr>
                </tfoot>
            </table>
            <div className='flex-between table-pagination'>
                <span>Showing {page * limit - (limit - 1)} to {page * data.length} of {count} entries</span>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={ isLimitPreview ? "disabled" : ""}>
                            <a href="#" onClick={handlePage(isLimitPreview ? 1 : page - 1)} aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>
                        </li>
                        {pages}
                        <li className={ isLimitNext ? "disabled" : ""}>
                            <a href="#" onClick={handlePage(isLimitNext ? page : page + 1)} aria-label="Next"><span aria-hidden="true">&raquo;</span></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default DataTable