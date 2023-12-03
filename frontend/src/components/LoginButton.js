import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
//Citation: https://auth0.com/docs/quickstart/spa/react/01-login#add-login-to-your-application
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;