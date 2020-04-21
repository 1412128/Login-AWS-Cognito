import React, { useState } from "react";
import { Auth } from "aws-amplify";

function FormSignUp(props) {
  const [username, setUsername] = useState("mba-dang-dn");
  const [password, setPassword] = useState("2j%<4'G]/7f67%Xa");
  const [email, setEmail] = useState("doanngocdang1996@gmail.com");
  const [nickname, setNickname] = useState("DnDoan");
  const [code, setCode] = useState(0);
  const [isSignedUp, setActiveSignUp] = useState(false);

  const handleRegister = () => {
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        // other custom attributes
        nickname,
      },
      validationData: [], //optional
    })
      .then((data) => {
        props.updateStep({ step: 1 });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmCode = () => {
    Auth.confirmSignUp(username, code, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true,
    })
      .then((data) => {
        props.updateStep({ step: 1 });
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

  if (isSignedUp) {
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
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Nickname:</label>
        <input
          type="text"
          name="nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    );
  }
}

export default FormSignUp;
