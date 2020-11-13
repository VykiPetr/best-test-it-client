import React from "react";
import "./styles/SignUp.css";
import { Input } from "semantic-ui-react";

function SignUp(props) {
  return (
    <div className="main-cont">
      <div className="form-cont">
        <form className="form" onSubmit={props.onSignUp}>
          <h3>Enter your username</h3>
          <div class="ui input">
            <Input name="username" type="text" placeholder="JohnDoe011"></Input>
          </div>
          <h3>Enter your email</h3>
          <div class="ui input">
            <Input name="email" type="email" placeholder="John@Doe.com"></Input>
          </div>
          <h3>Enter your password</h3>
          <div class="ui input">
            <Input
              name="password"
              type="password"
              placeholder="At least 8 characters with an uppercase letter, number, special character."></Input>
          </div>
          <div className="password-message">
            <p>
              You can enter any password, password format check has been
              disabled for testing
            </p>
            <p>
              You can view the code for checking password format here{" "}
              <a
                target="_blank"
                href="https://github.com/VykiPetr/best-test-it-server">
                Github repository
              </a>
            </p>
          </div>
          <button className="textStyle" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
