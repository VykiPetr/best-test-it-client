import 'semantic-ui-css/semantic.min.css';
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
import EditProfile from './components/EditProfile'
import ProfileProject from './components/ProjectView'
import ViewAllProjects from './components/ViewAllProjects';
// import AProject from './components/AProject'
import {API_URL} from './config'

function App() {

  let history = useHistory();
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
   
    if (!loggedInUser) {
      axios.get(`${API_URL}/user`, {withCredentials: true})
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
    axios.post(`${API_URL}/signin`, signingIn, {withCredentials: true})
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
    axios.post(`${API_URL}/signup`, signingUp, {withCredentials: true})
      .then((response)=>{
        console.log('signing up', response.data)
        setLoggedInUser(response.data)
        history.push(`/profile/${response.data._id}`)
      })
  }

  const handleLogout = (e) => {
    e.preventDefault()
    axios.post(`${API_URL}/logout`, {} ,{withCredentials: true})
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
    axios.post(`${API_URL}/project/create`, projectCreationData, {withCredentials: true})
      .then(()=>{
      history.push(`/profile/${loggedInUser._id}`)
    })
  }

  const handleProjectAdd = (e) => {
    e.preventDefault()
    const {appName, appDescription, appToolsData, deploymentLink, repoLink, uploadedAppLogo, appLogoLink, projectVersion} = e.target
    let appLogo = ''
    let appTools = []
    //handling the app tools array forming
    if (appToolsData.length > 1) {
      for (let i = 0; i < appToolsData.length; i++) {
        appTools.push(appToolsData[i].value)
      } 
    } else {
      appTools.push(appToolsData.value)
    }
    console.log(appTools)
    //handling the image upload/linking
    if (uploadedAppLogo) {
      let imageFile = uploadedAppLogo.files[0]
      console.log(uploadedAppLogo.files[0])
      let uploadForm = new FormData()
      uploadForm.append('logoUrl', imageFile)
      axios.post(`${API_URL}/logo-upload`, uploadForm, {withCredentials: true})
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

    axios.post(`${API_URL}/project//edit`, projectEditData, {withCredentials: true})
      .then(()=>{
        history.push(`/profile/${loggedInUser._id}`)
      })
  }

  const editProfile = (userImage, aboutMe, mySkills) => {
    let editingProfile = {
      userImage: userImage,
      aboutMe: aboutMe,
      mySkills: mySkills,
    }
    axios.post(`${API_URL}/profile/${loggedInUser._id}`, editingProfile, {withCredentials: true})
      .then(() => {
        history.push(`/profile/${loggedInUser._id}`)
      })
  }

  const handleProfileEdit = (e) => {
    e.preventDefault()
    const {aboutMe, mySkills, userImageLink, uploadedUserImage} = e.target
    let userImage = ''
    if (uploadedUserImage) {
      let imageFile = uploadedUserImage.files[0]
      let uploadForm = new FormData()
      uploadForm.append('logoUrl', imageFile)
      axios.post(`${API_URL}/logo-upload`, uploadForm, {withCredentials: true})
        .then((response)=>{
          userImage = response.data.appLogo
          editProfile(userImage, aboutMe.value, mySkills.value)
        })
    } else if (userImageLink.value.length == 0) {
      userImage = 'https://www.severnedgevets.co.uk/sites/default/files/styles/medium/public/guides/kitten.png?itok=Wpg9ghjs'
      editProfile(userImage, aboutMe.value, mySkills.value)
    } else if (userImageLink) {
      userImage = userImageLink.value
      editProfile(userImage, aboutMe.value, mySkills.value)
    }
  }

  return (
    <div >
      <OurNavbar loggedIn={loggedInUser} onLogout={handleLogout}/>
      {/* <AProject /> */}
      <Switch>
        <Route path={`/edit-profile/:profileId`} render={(routeProps)=>{
          return <EditProfile onProfileEdit={handleProfileEdit} loggedIn={loggedInUser} {...routeProps}/>
        }}/>
        <Route path={`/edit-project/:projectId`} render={(routeProps)=>{
          return <EditProjectForm onProjectEdit={handleProjectEdit} loggedIn={loggedInUser} {...routeProps}/>
        }}/>
        <Route path={`/add-project`} render={()=>{
          return <AddProjectForm onProjectAdd={handleProjectAdd} loggedIn={loggedInUser}/>
        }}/>
        <Route path={`/project/:projectId`} render={(routeProps)=>{
          return <ProfileProject loggedIn={loggedInUser} {...routeProps} />
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
