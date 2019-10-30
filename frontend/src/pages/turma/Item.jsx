import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, Fields, arrayInsert, arrayRemove } from 'redux-form'
import _ from 'lodash'

import Input, { dateFormatter } from '../../common/form/Input'
import Select, { SelectBusca } from '../../common/form/Select';
import { ButtonSucces, ButtonWarning, ButtonDanger } from "../../common/form/Button";
import { TURMA_FORM, BASE_URL } from "../consts";

function isEqualCustomizer(objValue, othValue) {
    return objValue.nome === othValue.nome
}

function loadOptionsAlunos(list) {
    return {
        ajax: {
            delay: 1000,
            url: function (params) {
                let url = `${BASE_URL}/alunos?nome__regex=/${params.term}/i`
                    url += '&select=nome%20dataNascimento&status__equals=ATIVO'
                return url
            },
            processResults: function (data) {
                const result = _.differenceWith(data.items, list, isEqualCustomizer)

                return {
                    results: result.map(aluno => (
                        { 
                            id: aluno._id, 
                            text: aluno.nome, 
                            dataNascimento: aluno.dataNascimento
                        }
                    ))
                };
            }
        }
    }
}


const Item = ({ index, item, list, field, readOnly, arrayInsert, arrayRemove }) => {

    function add(index, item = {}) {
        if (!readOnly) {
            arrayInsert(TURMA_FORM, field, index, item)
        }
    }

    function remove(index) {
        if (!readOnly && list.length > 1) {
            arrayRemove(TURMA_FORM, field, index)
        }
    }

    function renderButtons() {
        return (
            <>
                <ButtonSucces onClick={() => add(index + 1)} />
                <ButtonWarning onClick={() => setIsEditing(!isEditing)} isEditing={isEditing} />
                <ButtonDanger onClick={() => remove(index)} />
            </>
        )
    }

    const [selected, setSelected] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    if (!isEditing) {
        return (
            <>
                <td>
                    { item.nome }
                </td>
                <td>
                    { (item.dataNascimento || '')
                        .substr(0, 10)
                        .split('-')
                        .reverse()
                        .join('-') }
                </td>
                <td>
                    { item.status }
                </td>
                <td>
                    { renderButtons() }
                </td>
                </>
        )
    }

    return (
        <>
            <td>

                <Fields names={[`${field}[${index}].aluno`, `${field}[${index}].nome`]}
                    component={SelectBusca} readOnly={readOnly} selected={setSelected}
                    loadOptions={loadOptionsAlunos(list)} />
            </td>
            <td>
                <Field name={`${field}[${index}].dataNascimento`} component={Input}
                    readOnly={true} type='date' valueSelected={selected.dataNascimento}
                    format={dateFormatter} />
            </td>
            <td>
                <Field name={`${field}[${index}].status`} component={Select}
                    placeholder='Informe o status' readOnly={readOnly}>
                    <option></option>
                    <option value="CURSANDO">Cursando</option>
                    <option value="APROVADO">Aprovado</option>
                    <option value="REPROVADO">Reprovado</option>
                    <option value="DESISTENTE">Desistente</option>
                </Field>
            </td>
            <td>
                { renderButtons() }
            </td>
        </>
    )
}


const mapDispatchToProps = dispatch => bindActionCreators({
    arrayInsert, arrayRemove
}, dispatch)
export default connect(null, mapDispatchToProps)(Item)