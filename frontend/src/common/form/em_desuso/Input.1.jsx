import React from 'react'
import InputMask from 'react-input-mask'
import Label from '../Label'

export const Input = ({input, type, readOnly, valueSelected}) => {

    function formatDate(value) {
        // return date.toString().substr(0, 10).split('-').reverse().join('-')
        return type === 'date' ? value.toString().substr(0, 10) : value
    }
    
    function handleValue(){
        if(valueSelected) {
            input.onChange(valueSelected)
        }
        return formatDate(input.value)
    }

    return (
        <input {...input}
            className='form-control'
            disabled={readOnly} 
            value={ handleValue() }
            type={type} />
    )
}

export const LabelAndInput = ({ cols, name, label, input, placeholder, readOnly, type, mask }) => {

    function formatDate(value) {
        return type === 'date' ? value.toString().substr(0, 10) : value
    }

    return (
        <Label cols={cols} name={name} label={label}>
            <InputMask {...input} 
                className='form-control'
                placeholder={placeholder}
                disabled={readOnly}
                value={formatDate(input.value)} 
                mask={mask}
                type={type} />
        </Label>
    )
}

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

export default Input