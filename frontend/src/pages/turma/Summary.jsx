import React from 'react'

import Grid from '../../common/layout/Grid'
import Row from '../../common/layout/Row'
import ValueBox from '../../common/widget/ValueBox'

// ['CURSANDO', 'APROVADO', 'REPROVADO', 'DESISTENTE']

export default ({ cursando, aprovado, reprovado, desistente }) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox cols='12 2' color='green' icon='bank'
                    value={cursando} text='Cursandos' />
                <ValueBox cols='12 2' color='red' icon='credit-card'
                    value={aprovado} text='Aprovados' />
                <ValueBox cols='12 2' color='green' icon='bank'
                    value={reprovado} text='Reprovados' />
                <ValueBox cols='12 2' color='red' icon='credit-card'
                    value={desistente} text='Desistentes' />
                <ValueBox cols='12 2' color='blue' icon='money'
                    value={cursando + aprovado + reprovado + desistente} 
                    text='Total Alunos' />
            </Row>
        </fieldset>
    </Grid>
)