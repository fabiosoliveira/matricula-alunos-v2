import React from 'react'

export default () => (
    <header className='main-header'>
        <a href='/#/' className='logo'>
            <span className='logo-mini'><b>M</b>A</span>
            <span className='logo-lg'>
                <i className="fa fa-university"></i>
                <b> Matrícula</b> Alunos
            </span>
        </a>
        <nav className='navbar navbar-static-top'>
            {// eslint-disable-next-line
            }<a href="" className='sidebar-toggle' data-toggle='push-menu'> </a>
        </nav>
    </header>
)