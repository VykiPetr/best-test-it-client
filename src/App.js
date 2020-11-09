import './App.css';
import React, {useState, useEffect} from 'react'
import OurNavbar from './components/OurNavbar'
import Landing from './components/Landing'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import {Switch, Route, useHistory } from 'react-router-dom'
import axios from 'axios'
import ProfileView from './components/ProfileView'
import AddProjectForm from './components/AddProjectForm'
import EditProjectForm from './components/EditProjectForm'
// import AProject from './components/AProject'

function App(props) {

  let history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    console.log('logged in user is', loggedInUser)
    
    return () => {
    }
  })

  const handleSignIn = (e) => {
    e.preventDefault()
    const {email, password} = e.target
    console.log('Sign in', email.value, password.value)
    let signingIn = {
      email: email.value,
      password: password.value
    }
    axios.post(`http://localhost:5000/api/signin`, signingIn)
      .then((response)=>{
        setLoggedInUser(response.data)
        console.log('logged in', loggedInUser)
        history.push(`/profile/${response.data._id}`)
      })
  }

  const handleSignup = (e) => {
    e.preventDefault()
    console.log('Sign up')
    const {username, email, password} = e.target
    let signingUp = {
      username: username.value,
      email: email.value,
      password: password.value,
    }
    axios.post(`http://localhost:5000/api/signup`, signingUp)
      .then((response)=>{
        console.log('signing up', response.data)
        setLoggedInUser(response.data)
        history.push(`/profile/${response.data._id}`)
      })
  }

  const handleLogout = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/logout')
      .then(()=>{
        setLoggedInUser(null)
        console.log('loggin out',loggedInUser)
      })
  }

  const handleProjectAdd = (e) => {
    e.preventDefault()
    const {appName, appDescription, appTools, deploymentLink, repoLink, appLogo, projectVersion} = e.target
    let projectCreationData = {
      appName: appName,
      appDescription: appDescription,
      appTools: appTools,
      deploymentLink: deploymentLink,
      repoLink: repoLink,
      appLogo: appLogo,
      projectVersion: projectVersion
    }
    axios.post('http://localhost:5000/api/project/create', projectCreationData)
      .then(()=>{
        history.push(`/profile/${loggedInUser._id}`)
      })
  }

  const handleProjectEdit = (e) => {
    e.preventDefault()
    const {appName, appDescription, appTools, deploymentLink, repoLink, appLogo, projectVersion} = e.target
    let projectEditData = {
      appName: appName,
      appDescription: appDescription,
      appTools: appTools,
      deploymentLink: deploymentLink,
      repoLink: repoLink,
      appLogo: appLogo,
      projectVersion: projectVersion
    }

    axios.post(`http://localhost:5000/api/project//edit`, projectEditData)
      .then(()=>{
        history.push(`/profile/${loggedInUser._id}`)
      })
  }

  return (
    <div >
      <OurNavbar loggedIn={loggedInUser} onLogout={handleLogout}/>
      {/* <AProject /> */}
      <Switch>
        <Route path={`/edit-project/:projectId`} render={()=>{
          return <EditProjectForm onProjectEdit={handleProjectEdit} loggedIn={loggedInUser}/>
        }}/>
        <Route path={`/add-project`} render={()=>{
          return <AddProjectForm onProjectAdd={handleProjectAdd} loggedIn={loggedInUser}/>
        }}/>
        <Route path={`/profile/:profileId`} render={()=>{
          return <ProfileView loggedIn={loggedInUser} />
        }}/>
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
