import React from "react";
import "./styles/Landing.css";

function Landing() {
  return (
    <div className="landing-body">
      <div className="landing-page">
        <h2>Welcome To</h2>
        <img src="/images/BestTestItLogo-removebg.png" />
        <h2>
          Ever needed to show your frontend to someone to make it look and
          perform better?{" "}
        </h2>
        <h2>Now you can do it with this app!</h2>
        <h2>Here people can leave feedback about your frontend!</h2>
      </div>
    </div>
  );
}

export default Landing;
