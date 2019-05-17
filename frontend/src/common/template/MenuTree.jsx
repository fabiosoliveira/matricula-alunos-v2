import React from 'react'

export default ({ icon, label, children }) => (
    <li className='treeview'>
        {// eslint-disable-next-line
        }<a href="">
            <i className={`fa fa-${icon}`}></i> <span>{label}</span>
            <span className="pull-right-container">
                <i className='fa fa-angle-left pull-right'></i>
            </span>
        </a>
        <ul className='treeview-menu'>
            {children}
        </ul>
    </li>
)
