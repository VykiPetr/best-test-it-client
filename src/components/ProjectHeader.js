import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

function ProjectHeader(props) {
  const {userRefId, appName, appLogo, likes, _id } = props.project;

  const handleProjectClick = () => {};

  return (
    <div>
      <Card.Group className="card-container" >
        <Card style={{ backgroundColor: "#FFE3B3" }}>
          <Card.Content >
            <Image floated="left" size="mini" src={appLogo} />

            <Card.Header>
              <Link to={`/project/${_id}`}>
                {appName}{" "}
              </Link>
            </Card.Header>
            <Link to={`/profile/${userRefId._id}`}>
            <Card.Meta floated="right">{userRefId.username}</Card.Meta>
            </Link>
            <Card.Description>Some text here</Card.Description>
            <Card.Meta>{likes.length} - Likes</Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}

export default ProjectHeader;
