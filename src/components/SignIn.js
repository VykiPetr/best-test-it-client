import React from "react";

function SignIn(props) {
  return (
    <form onSubmit={props.onSignIn}>
      <h3>Enter your email</h3>
      <input name="email" type="email" placeholder="John@Doe.com"></input>
      <h3>Enter your password</h3>
      <input name="password" type="password"></input>
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;
