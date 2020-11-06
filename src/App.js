import './App.css';
import React, {useState} from 'react'
import OurNavbar from './components/OurNavbar'
import Landing from './components/Landing'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import {Switch, Route} from 'react-router-dom'
import axios from 'axios'

function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)

  const handleSignIn = (e) => {
    e.preventDefault()
    const [email, password] = e.target
    console.log('Sign in', email.value, password.value)
    let signingIn = {
      email: email.value,
      password: password.value
    }
    axios.post(`http://localhost:5000/api/signin`, signingIn)
      .then((response)=>{
        setLoggedInUser(response.data)
      })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    console.log('Sign up')
    const [username, email, password] = e.target
    let signingUp = {
      username: username.value,
      email: email.value,
      password: password.value,
    }
    axios.post(`http://localhost:5000/api/signup`, signingUp)
      .then((response)=>{
        console.log(response.data)
      })
  }

  const handleLogout = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/logout')
      .then(()=>{
        setLoggedInUser(null)
      })
  }

  return (
    <div >
      <OurNavbar loggedIn={loggedInUser} onLogout={handleLogout}/>

      <Switch>
        <Route exact path='/' render={() => {
          return <Landing />
        }} />
        <Route path='/sign-in' render={() => {
          return <SignIn onSignIn={handleSignIn}/>
        }} />
        <Route path='/sign-up' render={() => {
          return <SignUp onSignUp={handleSignup}/>
        }} />
        
      </Switch>
    </div>
  );
}

export default App;
