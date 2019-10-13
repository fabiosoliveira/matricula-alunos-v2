import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Dashboard from '../pages/dashboard/Dashboard'
import Endereco from '../pages/endereco/Endereco';
import Aluno from '../pages/aluno/Aluno';
import Turma from '../pages/turma/Turma';

export default () => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/endereco' component={Endereco} />
            <Route path='/aluno' component={Aluno} />
            <Route path='/turma' component={Turma} />
            <Redirect from='*' to='/' />
        </Switch>
    </div>
)