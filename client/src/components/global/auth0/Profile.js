import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const postUserData = async () => {
        const userInfo = {
          fullName: user.name,
          email: user.email,
          image: user.picture,
          role: null,
        };
        await fetch(`https://vanhaul.herokuapp.com/api/users`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(userInfo),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
      };
      postUserData();
    }
  }, [isAuthenticated]);

  return <div></div>;
};

export default Profile;
