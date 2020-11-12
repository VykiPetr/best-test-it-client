import React from "react";


function SignUp(props) {
  return (
    <form onSubmit={props.onSignUp}>
      <h3>Enter your username</h3>
      <input name="username" type="text" placeholder="JohnDoe011"></input>
      <h3>Enter your email</h3>
      <input name="email" type="email" placeholder="John@Doe.com"></input>
      <h3>Enter your password</h3>
      <input
        name="password"
        type="password"
        placeholder="At least 8 characters with an uppercase letter, number, special character."></input>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
