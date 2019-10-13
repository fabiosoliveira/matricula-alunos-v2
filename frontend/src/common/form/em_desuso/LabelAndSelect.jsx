import React from 'react'
import Label from './Label';

export default ({ cols, name, label, input, readOnly, children }) => (
    <Label cols={cols} name={name} label={label}>
            <select {...input}
                className='form-control'
                disabled={readOnly}>
                {children}
            </select>
    </Label>
)