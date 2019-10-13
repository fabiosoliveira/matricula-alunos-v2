import React from 'react'
import If from '../operator/If';

export const Button = ({ option='default', size, icon, onClick, type='button', children }) => (
    <button type={type} className={`btn btn-${option} btn-${size}`}
        onClick={onClick}>
        <If test={icon}>
            <i className={`fa fa-${icon}`}></i>
        </If>
        {children}
    </button>
)

export const ButtonSucces = ({onClick, size='sm'}) => 
    <Button option='success' size={size} icon='plus' onClick={onClick} />

export const ButtonWarning = ({onClick, size='sm', isEditing}) => 
    <Button option='warning' size={size} icon={isEditing ? 'clone' : 'pencil'} onClick={onClick} />

export const ButtonDanger = ({onClick, size='sm'}) => 
    <Button option='danger' size={size} icon='trash-o' onClick={onClick} />

export default Button