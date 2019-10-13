import React, {useState} from 'react'

export const Box = ({ title, children }) => {

  return (
    <div className='box'>
        <div className="box-header">
          <h3 className="box-title">{title}</h3>
        </div>
        <div className="box-body">
            {children}
        </div>
    </div>
  )
}

export const BoxWithToolsAndBorder = ({ title, children, visivel = false }) => {

  const [collapsed, setCollapse] = useState(visivel)

  return (
    <div className={`box box-default ${!collapsed ? 'collapsed-box' : ''}`}>
        <div className="box-header with-border" onClick={() => setCollapse(!collapsed)}>
          <h3 className="box-title">{title}</h3>

          <div className="box-tools pull-right">
            <button type="button" className="btn btn-box-tool" onClick={() => setCollapse(!collapsed)}>
              <i className={`fa fa-${collapsed ? 'minus' : 'plus'}`}></i>
            </button>
          </div>

        </div>
        <div className="box-body collapse" style={!collapsed ? {display: "none"} : {display: "block"}}>
            {children}
        </div>
    </div>
  )
}

export default Box