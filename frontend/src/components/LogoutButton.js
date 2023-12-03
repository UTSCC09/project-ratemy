import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
//Citation: https://auth0.com/docs/quickstart/spa/react/01-login#add-login-to-your-application
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export default LogoutButton;