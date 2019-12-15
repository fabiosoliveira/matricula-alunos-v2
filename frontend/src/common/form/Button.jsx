import React from 'react'
import If from '../operator/If';

export const Button = ({ option='default', size, disabled, icon, onClick, type='button', children }) => (
    <button type={type} className={`btn btn-${option} btn-${size} ${disabled && 'disabled'}`}
        onClick={onClick}>
        <If test={icon}>
            <i className={`fa fa-${icon}`}></i>
        </If>
        {children}
    </button>
)

export const ButtonSucces = ({onClick, size='sm', disabled}) => 
    <Button disabled={disabled} option='success' size={size} icon='plus' onClick={onClick} />

export const ButtonWarning = ({onClick, size='sm', disabled, isEditing}) => 
    <Button disabled={disabled} option='warning' size={size} icon={isEditing ? 'clone' : 'pencil'} onClick={onClick} />

export const ButtonDanger = ({onClick, size='sm', disabled}) => 
    <Button disabled={disabled} option='danger' size={size} icon='trash-o' onClick={onClick} />

export const ButtonInfo = ({onClick, size='sm', icon, disabled}) => 
    <Button disabled={disabled} option='info' size={size} icon={icon} onClick={onClick} />

export default Button