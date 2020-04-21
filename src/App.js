import React, { useState } from "react";

import Amplify, { Auth } from "aws-amplify";

import FormSignIn from "./FormSignIn";
import FormSignUp from "./FormSignUp";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: "ap-southeast-1:d69597fb-86d6-42ea-913a-9e5ada197b1c",

    // REQUIRED - Amazon Cognito Region
    region: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: "ap-southeast-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-southeast-1_B353BVmF8",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "64v6d06oliv9oi2gkpljqrphia",
  },
});
function App() {
  const initDataApp = {
    step: 1,
    log: "",
  };

  const [dataApp, setDataApp] = useState(initDataApp);

  return (
    <div className="App">
      <button onClick={() => setDataApp({ step: dataApp.step === 0 ? 1 : 0 })}>
        Toggle
      </button>
      {dataApp.step === 0 && <FormSignUp updateStep={setDataApp} />}
      {dataApp.step === 1 && <FormSignIn updateStep={setDataApp} />}
      {dataApp.step === 2 && <h3>You have signed in.</h3>}
    </div>
  );
}

export default App;
