import './ItemList.css'
import React, { Component } from 'react'

import Grid from '../../common/layout/Grid'
import Item from './Item';


class ItemList extends Component {

    renderRows() {
        const list = this.props.list || []
        return list.map((item, index) => (
            <tr key={index}>
                <Item index={index} 
                    item={item} 
                    list={list} 
                    field={this.props.field} 
                    readOnly={this.props.readOnly} />
            </tr>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className='table table-condensed'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th className='table-actions'>Data Nascimento</th>
                                <th className='table-actions'>Status</th>
                                <th className='table-actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

export default ItemList