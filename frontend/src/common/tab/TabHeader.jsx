import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import If from '../operator/If'
import { selectTab } from './tabActions'


const TabHeader = (props) => {
    const selected = props.tab.selected === props.target
    const visible = props.tab.visible[props.target]

    return (
        <If test={visible}>
            <li className={selected ? 'active' : ''}>
                {
                    // eslint-disable-next-line
                }<a href='javascript:;' 
                    data-toggle='tab'
                    onClick={() => props.selectTab(props.target)}
                    data-target={props.target}>
                    <i className={`fa fa-${props.icon}`}></i> {props.label}
                </a> 
            </li> 
        </If>
    )
}
const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)













// import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// import If from '../operator/If'
// import { selectTab } from './tabActions'


// class TabHeader extends Component {
//     render() {
//         const selected = this.props.tab.selected === this.props.target
//         const visible = this.props.tab.visible[this.props.target]
//         return (
//             <If test={visible}>
//                 <li className={selected ? 'active' : ''}>
//                     {
//                         // eslint-disable-next-line
//                     }<a href='javascript:;' 
//                         data-toggle='tab'
//                         onClick={() => this.props.selectTab(this.props.target)}
//                         data-target={this.props.target}>
//                         <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
//                     </a> 
//                 </li> 
//             </If>
//         )
//     }
// }
// const mapStateToProps = state => ({ tab: state.tab })
// const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch)
// export default connect(mapStateToProps, mapDispatchToProps)(TabHeader)
