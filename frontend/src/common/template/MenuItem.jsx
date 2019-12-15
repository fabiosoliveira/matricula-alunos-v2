import React from 'react'
import { Link } from "react-router-dom";

export default ({ icon, label, path }) => (
    <li>
        <Link to={path}>
            <i className={`fa fa-${icon}`}></i> <span>{label}</span>
        </Link>
    </li>
)