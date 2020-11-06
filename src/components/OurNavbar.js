import React from 'react'
import {Link} from 'react-router-dom'
let textStyle = {
    textDecoration: 'none',
    color: 'white',
    textShadow: '1px 1px black',
}

function OurNavbar(props) {


   
    return (
        <nav>
            
            <Link to='/' style={textStyle}>Landing </Link>
            
            <Link to='/sign-up' style={textStyle}>Sign Up </Link>
            <Link to='/sign-in' style={textStyle}>Sign In </Link>
            <Link to='/view-projects' style={textStyle}>Projects </Link>
            <Link to='/' style={textStyle} onClick={props.onLogout}>Logout </Link>
        </nav>
    )
}

export default OurNavbar