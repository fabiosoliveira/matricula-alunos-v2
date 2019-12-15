import React from 'react'
import Label from './Label'

export const dateFormatter = (date = '') => date.toString().substr(0, 10)

export const Profile = ({ cols, name, label, input, placeholder, readOnly, type, icon, valueSelected }) => {
    return (
        <Label cols={cols} name={name} label={label}>
            <div>
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#modal-default">
                    Carregar foto
                </button>
            </div>
        </Label>
    )
}

export default Profile