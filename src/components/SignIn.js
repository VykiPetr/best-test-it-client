import React from "react";
import "./styles/SignIn.css";
import { Input } from "semantic-ui-react";

function SignIn(props) {
  return (
    <div className="main-cont">
      <div className="form-cont">
        <form className="form" onSubmit={props.onSignIn}>
          <h3>Enter your email</h3>
          <div className="ui input">
            <Input name="email" type="email" placeholder="John@Doe.com"></Input>
          </div>
          <h3>Enter your password</h3>
          <div className="ui input">
            <Input name="password" type="password"></Input>
          </div>
          <button className="textStyle" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
