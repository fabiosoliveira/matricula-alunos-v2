import React from 'react'
//import InputMask from 'react-input-mask'
import Label from './Label'
import If from '../operator/If';

export const dateFormatter = (date = '') => date.toString().substr(0, 10)

export const Input = ({ cols, name, label, input, placeholder, readOnly, type, icon, valueSelected }) => {

    const inputs = (
        <>
            <If test={icon}>
                <span className="input-group-addon">
                    <i className={`fa fa-${icon}`}></i>
                </span>
            </If>
            <input {...input} 
                className='form-control'
                placeholder={placeholder}
                value={ (valueSelected && input.onChange(valueSelected)) || input.value }
                disabled={readOnly}
                type={type} />
        </>
    )
    
    return (
        <Label cols={cols} name={name} label={label}>
            { icon ? <div className="input-group">{inputs}</div> : inputs }
        </Label>
    )
}

export default Input