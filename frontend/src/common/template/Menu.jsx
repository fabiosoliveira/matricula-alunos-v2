import React from 'react'
    
import MenuItem from './MenuItem';
import MenuTree from './MenuTree';

export default () => (
    <ul className='sidebar-menu' data-widget='tree'>
        <MenuItem path='/' label='Dashboard' icon='dashboard' />
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='endereco' label='Endereco' icon='envelope' />
            <MenuItem path='aluno' label='Aluno' icon='graduation-cap' />
            <MenuItem path='turma' label='Turma' icon='users' />
        </MenuTree>
    </ul>
)