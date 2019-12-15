import React from 'react'
import Grid from '../layout/Grid'

export default ({ cols, name, label, children }) => {
    if (label)
        return (
            <Grid cols={cols}>
                <div className='form-group'>
                    <label htmlFor={name}>{label}</label>
                    {children}
                </div>
            </Grid>
    )
    return children
}