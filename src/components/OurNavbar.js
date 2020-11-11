import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
let textStyle = {
    textDecoration: 'none',
    color: 'white',
    textShadow: '1px 1px black',
}

function OurNavbar(props) {

    const [LoggedInUser, setLoggedInUser] = useState({})
    useEffect(() => {
        setLoggedInUser(props.loggedIn)
    })


    return (
        <nav>
            <Link to='/' style={textStyle}>Landing </Link>
            {
                LoggedInUser ? null : <Link to='/sign-up' style={textStyle}>Sign Up </Link>
            }
            {
                LoggedInUser ? null : <Link to='/sign-in' style={textStyle}>Sign In </Link>
            }
            <Link to='/view-projects' style={textStyle}>Projects </Link>
            {
                LoggedInUser ? <Link style={textStyle} to={`/profile/${LoggedInUser._id}`}>Profile </Link> : null
            }
            {
                LoggedInUser ? <Link to='/' style={textStyle} onClick={props.onLogout}>Logout </Link> : null
            }
            
        </nav>
    )
}

export default OurNavbar