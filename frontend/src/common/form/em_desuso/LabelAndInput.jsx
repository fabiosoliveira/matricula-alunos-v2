import React from 'react'
import Label from '../Label'
import InputMask from 'react-input-mask'

export default ({ cols, name, label, input, placeholder, readOnly, type, mask }) => {

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