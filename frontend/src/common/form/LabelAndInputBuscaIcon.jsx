import React from 'react'
import Label from './Label'
//import InputMask from 'react-input-mask'


export default ({ cols, name, label, input, placeholder, readOnly, icon, children }) => (
    <Label cols={cols} name={name} label={label}>
        <div className="input-group">
            <span className="input-group-addon">
                <i className={`fa fa-${icon}`}></i>
            </span>
            <input {...input}
                className='form-control'
                placeholder={placeholder}
                disabled={readOnly}
                type='search' />
            <select multiple
                className='form-control'
                disabled={readOnly}>
                {children}
            </select>
        </div>
    </Label>
)