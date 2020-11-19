import React, { useEffect } from "react";
import firebase from "../../firebase";
import { navigate } from "@reach/router";

const PrivateRoutes = (props) => {
  const { children } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      
      if (!user) {
        navigate("/sign-in");
      }
    });
  }, []);

  return <>{children}</>
};

export default PrivateRoutes;

