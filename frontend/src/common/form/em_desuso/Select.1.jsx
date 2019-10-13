import React, { useEffect, useRef } from 'react'
import InputMask from 'react-input-mask'
import $ from 'jquery'

import If from '../../operator/If'
import Label from '../Label';

export const Select = ({ input, readOnly, children }) => (
    <select {...input}
        className='form-control'
        disabled={readOnly}>
        {children}
    </select>
)

export const LabelAndSelect = ({ cols, name, label, input, readOnly, children }) => (
    <Label cols={cols} name={name} label={label}>
            <select {...input}
                className='form-control'
                disabled={readOnly}>
                {children}
            </select>
    </Label>
)

export const LabelAndInputIcon = ({ cols, name, label, input, placeholder, readOnly, type, icon, mask }) => {

    function formatDate(value) {
        return type === 'date' ? value.toString().substr(0, 10) : value
    }
    
    return (
        <Label cols={cols} name={name} label={label}>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className={`fa fa-${icon}`}></i>
                    </span>
                    <InputMask {...input}
                        className='form-control'
                        placeholder={placeholder}
                        disabled={readOnly}
                        value={formatDate(input.value)} 
                        mask={mask}
                        type={type} />
                </div>
        </Label>
    )
}

export const SelectBusca = (props) => {

    const [firstName, secondName] = props.names
    const id = eval(`props.${firstName}`)
    const text = eval(`props.${secondName}`)

    function handleChange(input) {
        id.input.onChange(input.id)
        text.input.onChange(input.text)
        props.selected(input)
    }

    const selectEl = useRef(null)
    
    useEffect(() => {
        const newOption = new Option(text.meta.initial, id.meta.initial, false, false);
        $(selectEl.current).append(newOption).trigger('change');
        $(selectEl.current).select2(props.loadOptions)

        $(selectEl.current).on('select2:select', function (e) {
            const data = e.params.data;
            handleChange(data)
        });
    })

    return (
        <div className="form-group">

            <input type='hidden' {...id.input} />
            <input type='hidden' {...text.input} />

            <select ref={selectEl} className="form-control" style={{ width: '100%' }}>
            </select>
        </div>
    )
}


export const LabelAndSelectBuscaIcon = (props) => {

    const [firstName, secondName] = props.names
    const id = eval(`props.${firstName}`)
    const text = eval(`props.${secondName}`)

    function handleChange(input) {
        id.input.onChange(input.id)
        text.input.onChange(input.text)
        { props.selected && props.selected(input) }
    }

    const selectEl = useRef(null)

    useEffect(() => {
        const newOption = new Option(text.meta.initial, id.meta.initial, false, false);
        $(selectEl.current).append(newOption).trigger('change');

        $(selectEl.current).select2(props.loadOptions)

        $(selectEl.current).on('select2:select', function (e) {
            const data = e.params.data;
            handleChange(data)
        });
    })

    return (
        <Label cols={props.cols} name={props.name} label={props.label}>
            <div className="input-group">
                <If test={props.icon} >
                    <span className="input-group-addon">
                        <i className={`fa fa-${props.icon}`}></i>
                    </span>
                </If>

                <input type='hidden' {...id.input} />
                <input type='hidden' {...text.input} />

                <select ref={selectEl} className="form-control" style={{ width: '100%' }}>
                </select>
            </div>
        </Label>

    )
}

export default Select