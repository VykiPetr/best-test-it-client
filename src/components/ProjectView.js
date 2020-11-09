import React, {useState, useEffect} from 'react'

function ProjectView(props) {

    const [ProjectData, setProjectData] = useState({})

    useEffect(() => {
        
        
    }, [])

    return (
        <div>
            <div>
                <div>
                    <Link onClick={onLikeClick}>Likes 0</Link>
                    <p>{ProjectData.projectVersion}</p>
                </div>
                <div>
                    <img src={ProjectData.appLogo}/>
                </div>
                <div>
                    {
                        ProjectData.userRefId == props.loggedIn._id ? <Link to={`/edit-project/${ProjectData._id}`}>Edit</Link> : null
                    }
                    {
                        ProjectData.userRefId == props.loggedIn._id ? <Link onClick={onDeleteClick}>Delete</Link> : null
                    }
                </div>
            </div>
            <h1>{ProjectData.appName}</h1>
            <div>
                <div>
                    tools used
                    {ProjectData.appTools}
                </div>
                <div>
                    <p>made by <Link to={`/profile`}>{ProjectData._id}</Link></p>
                    <p>{ProjectData.appDescription}</p>
                </div>
            </div>
        </div>
    )
}


export default ProjectView