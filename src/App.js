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
import ViewAllProjects from './components/ViewAllProjects';
// import AProject from './components/AProject'

function App() {

  let history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
   
    if (!loggedInUser) {
      axios.get(`http://localhost:5000/api/user`, {withCredentials: true})
        .then((response)=>{
          setLoggedInUser(response.data)
          console.log('logged in user is', response.data)
        })
    }
    return () => {
    }
  }, [])

  const handleSignIn = (e) => {
    e.preventDefault()
    const {email, password} = e.target
    console.log('Sign in', email.value, password.value)
    let signingIn = {
      email: email.value,
      password: password.value
    }
    axios.post(`http://localhost:5000/api/signin`, signingIn, {withCredentials: true})
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
    axios.post(`http://localhost:5000/api/signup`, signingUp, {withCredentials: true})
      .then((response)=>{
        console.log('signing up', response.data)
        setLoggedInUser(response.data)
        history.push(`/profile/${response.data._id}`)
      })
  }

  const handleLogout = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/logout', {} ,{withCredentials: true})
      .then(()=>{
        setLoggedInUser(null)
        console.log('loggin out',loggedInUser)
        history.push(`/`)
      })
  }

  const handleCreateProject = (appLogo, appName, appDescription, appTools, deploymentLink, repoLink, projectVersion) => {
    let projectCreationData = {
      appName: appName,
      appDescription: appDescription,
      appTools: appTools,
      deploymentLink: deploymentLink,
      repoLink: repoLink,
      appLogo: appLogo,
      projectVersion: projectVersion
    }
    axios.post('http://localhost:5000/api/project/create', projectCreationData, {withCredentials: true})
      .then(()=>{
      history.push(`/profile/${loggedInUser._id}`)
    })
  }

  const handleProjectAdd = (e) => {
    e.preventDefault()
    const {appName, appDescription, appToolsData, deploymentLink, repoLink, uploadedAppLogo, appLogoLink, projectVersion} = e.target
    let appLogo = ''
    let appTools = []
    if (appToolsData.length > 1) {
      for (let i = 0; i < appToolsData.length; i++) {
        appTools.push(appToolsData[i].value)
      } 
    } else {
      appTools.push(appToolsData.value)
    }
    console.log(appTools)
    if (uploadedAppLogo) {
      let imageFile = uploadedAppLogo.files[0]
      console.log(uploadedAppLogo.files[0])
      let uploadForm = new FormData()
      uploadForm.append('logoUrl', imageFile)
      axios.post(`http://localhost:5000/api/logo-upload`, uploadForm, {withCredentials: true})
        .then((response)=>{
          appLogo = response.data.appLogo
          handleCreateProject(appLogo, appName.value, appDescription.value, appTools, deploymentLink.value, repoLink.value, projectVersion.value)
        })
    } else if (appLogoLink.value.length == 0) {
      appLogo = 'https://www.severnedgevets.co.uk/sites/default/files/styles/medium/public/guides/kitten.png?itok=Wpg9ghjs'
      handleCreateProject(appLogo, appName.value, appDescription.value, appTools, deploymentLink.value, repoLink.value, projectVersion.value)
    } else if (appLogoLink) {
      appLogo = appLogoLink.value
      handleCreateProject(appLogo, appName.value, appDescription.value, appTools, deploymentLink.value, repoLink.value, projectVersion.value)
    }
  }

  const handleProjectEdit = (e) => {
    e.preventDefault()
    const {appName, appDescription, appTools, deploymentLink, repoLink, uploadedAppLogo, appLogoLink, projectVersion} = e.target
    let projectEditData = {
      appName: appName.value,
      appDescription: appDescription.value,
      appTools: appTools.value,
      deploymentLink: deploymentLink.value,
      repoLink: repoLink.value,
      appLogo: uploadedAppLogo.value,
      projectVersion: projectVersion.value
    }

    axios.post(`http://localhost:5000/api/project//edit`, projectEditData, {withCredentials: true})
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
        <Route path={`/profile/:profileId`} render={(routeProps)=>{
          return <ProfileView loggedIn={loggedInUser} {...routeProps} />
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
        <Route path='/view-projects' render={() => {
          return <ViewAllProjects />
        }}


        />
        
      </Switch>
    </div>
  );
}

export default App;
