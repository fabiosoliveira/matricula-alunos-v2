import React from 'react'

import Grid from '../layout/Grid'

export default ({ cols, color, value, text, icon }) => (
    <Grid cols={cols}>
        <div className="info-box">
            <span className={`info-box-icon bg-${color}`}>
                <i className={`fa fa-${icon}`}></i>
            </span>

            <div className="info-box-content">
              <span className="info-box-text">{text}</span>
              <span className="info-box-number">{value}</span>
            </div>
        </div>
    </Grid>
)
