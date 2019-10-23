import React from 'react'

import Grid from '../../common/layout/Grid'
import Row from '../../common/layout/Row'
import SmallBox from '../../common/widget/SmallBox'

// ['CURSANDO', 'APROVADO', 'REPROVADO', 'DESISTENTE']

export default ({ cursando, aprovado, reprovado, desistente }) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <SmallBox cols='12 2' color='blue' icon='user'
                    value={cursando} text='Cursandos' />
                <SmallBox cols='12 2' color='green' icon='user'
                    value={aprovado} text='Aprovados' />
                <SmallBox cols='12 2' color='red' icon='user'
                    value={reprovado} text='Reprovados' />
                <SmallBox cols='12 2' color='yellow' icon='user'
                    value={desistente} text='Desistentes' />
                <SmallBox cols='12 2' color='gray' icon='users'
                    value={cursando + aprovado + reprovado + desistente} 
                    text='Total Alunos' />
            </Row>
        </fieldset>
    </Grid>
)