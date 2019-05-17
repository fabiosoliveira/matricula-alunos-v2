import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Dashboard from '../pages/dashboard/Dashboard'
import Endereco from '../pages/endereco/Endereco';
import Aluno from '../pages/aluno/Aluno';

export default () => (
    <div className="content-wrapper">
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/endereco' component={Endereco} />
            <Route path='/aluno' component={Aluno} />
            <Redirect from='*' to='/' />
        </Switch>
    </div>
)