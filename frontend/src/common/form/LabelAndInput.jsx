import React from 'react'
import Label from './Label'
import InputMask from 'react-input-mask'

export default ({ cols, name, label, input, placeholder, readOnly, type, mask }) => (
    <Label cols={cols} name={name} label={label}>
        <InputMask {...input} 
            className='form-control'
            placeholder={placeholder}
            disabled={readOnly} 
            mask={mask}
            type={type} />
    </Label>
)