import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
//Citation: https://auth0.com/docs/quickstart/spa/react/01-login#add-login-to-your-application
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;