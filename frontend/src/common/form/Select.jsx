import React, { useEffect, useRef } from 'react'
import $ from 'jquery'

import If from '../../common/operator/If'
import Label from './Label';

export const Select = ({ cols, name, label, input, readOnly, children }) => (
    <Label cols={cols} name={name} label={label}>
        <select {...input}
            className='form-control'
            disabled={readOnly}>
            {children}
        </select>
    </Label>
)

export const SelectBusca = (props) => {

    const { names, selected, icon, cols, name, label, loadOptions, readOnly, children } = props

    const [firstName, secondName] = names
    // eslint-disable-next-line no-eval
    const id = eval(`props.${firstName}`)
    // eslint-disable-next-line no-eval
    const text = eval(`props.${secondName}`)

    function handleChange(input) {
        id.input.onChange(input.id)
        text.input.onChange(input.text)
        selected && selected(input)
    }

    const selectEl = useRef(null)

    useEffect(() => {
        const newOption = new Option(text.meta.initial, id.meta.initial, false, false);
        $(selectEl.current).append(newOption).trigger('change');
        $(selectEl.current).select2(loadOptions)

        $(selectEl.current).on('select2:select', function (e) {
            const data = e.params.data;
            handleChange(data)
        });
    })

    const inputs = (
        <>
            <If test={icon} >
                <span className="input-group-addon">
                    <i className={`fa fa-${icon}`}></i>
                </span>
            </If>

            <input type='hidden' {...id.input} />
            <input type='hidden' {...text.input} />

            <select ref={selectEl} 
                disabled={readOnly}
                className="form-control" 
                style={{ width: '100%' }}>
                    {children}
            </select>
        </>
    )

    return (
        <Label cols={cols} name={name} label={label}>
            { icon ? <div className="input-group">{inputs}</div> : inputs }
        </Label>
    )
}

export default Select