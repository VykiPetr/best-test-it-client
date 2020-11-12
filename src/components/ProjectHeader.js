import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";

function ProjectHeader(props) {
  const {
    userRefId,
    appName,
    appLogo,
    likes,
    _id,
    appDescription,
  } = props.project;

  const handleProjectClick = () => {};

  return (
    <div>
      <Card.Group>
        <Card className="card-style" raised="true">
          <Card.Content>
            <Image floated="left" size="mini" src={appLogo} />

            <Card.Header textAlign="left">
              <Link to={`/project/${_id}`}>{appName} </Link>
            </Card.Header>
            <Link to={`/profile/${userRefId._id}`}>
              <Card.Meta floated="right">{userRefId.username}</Card.Meta>
            </Link>
            <Card.Description>{appDescription}</Card.Description>
            <Card.Meta textAlign="right">{likes.length} - Likes</Card.Meta>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}

export default ProjectHeader;
