import React, { useState } from "react";
import { Auth } from "aws-amplify";

function FormSignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState(0);
  const [isSignedIn, setActiveSignIn] = useState(false);
  const [user, setUser] = useState("");

  const handleLogin = () => {
    // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
    //   Auth.signIn({
    //     username, // Required, the username
    //     password, // Optional, the password
    //     // validationData, // Optional, a random key-value pair map which can contain any key and will be passed to your PreAuthentication Lambda trigger as-is. It can be used to implement additional validations around authentication
    //   })
    //     .then((user) => console.log(user))
    //     .catch((err) => console.log(err));
    Auth.signIn({
      username, // Required, the username
      password, // Optional, the password
    })
      .then((user) => {
        if (
          user.challengeName === "SMS_MFA" ||
          user.challengeName === "SOFTWARE_TOKEN_MFA"
        ) {
          setUser(user);
          setActiveSignIn(true);
        } else {
          props.updateStep({ step: 2 });
          console.log(user);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmCode = () => {
    Auth.confirmSignIn(
      user, // Return object from Auth.signIn()
      code, // Confirmation code
      "SMS_MFA" // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    )
      .then((data) => {
        props.updateStep({ step: 2 });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleResendCode = () => {
    Auth.resendSignUp(username)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isSignedIn) {
    return (
      <div className="form">
        <label>Code:</label>
        <input
          type="text"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleConfirmCode}>Confirm code</button>
        <button onClick={handleResendCode}>Resend code</button>
      </div>
    );
  } else {
    return (
      <div className="form">
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Passowrd:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }
}

export default FormSignIn;
