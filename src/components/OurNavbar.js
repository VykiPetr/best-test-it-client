import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/OurNavbar.css'

// let textStyle = {
//   textDecoration: "none",
//   color: "white",
//   textShadow: "1px 1px black",
// };


function OurNavbar(props) {
  const [LoggedInUser, setLoggedInUser] = useState({});
  useEffect(() => {
    setLoggedInUser(props.loggedIn);
  });

  return (
    <nav>
      <div className="nav-div">
      <Link to="/" className="textStyle">
        Landing{" "}
      </Link>
      {LoggedInUser ? null : (
        <Link to="/sign-up" className="textStyle">
          Sign Up{" "}
        </Link>
      )}
      {LoggedInUser ? null : (
        <Link to="/sign-in" className="textStyle">
          Sign In{" "}
        </Link>
      )}
      <Link to="/view-projects" className="textStyle">
        Projects{" "}
      </Link>
      {LoggedInUser ? (
        <Link  to={`/profile/${LoggedInUser._id}`} className="textStyle">
          Profile{" "}
        </Link>
      ) : null}
      {LoggedInUser ? (
        <Link to="/"  onClick={props.onLogout} className="textStyle">
          Logout{" "}
        </Link>
      ) : null}
      </div>
    </nav>
  );
}

export default OurNavbar;
