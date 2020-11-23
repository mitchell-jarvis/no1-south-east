import React, { useState, useEffect } from "react";
import Routes from "./containers/Routes";
import firebase, { provider } from "./firebase";
import { navigate } from "@reach/router";
import library from "./data/fa-library";


const App = () => {
  const [user, setUser] = useState(null);
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user);
        navigate("/browseDeals");
      });
  };

  const signIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        setUser(user);
        navigate("/browseDeals");
      })
      .catch((error) => {
        alert(
          "The email or password you have entered is incorrect, please try again."
        );
        console.log(error);
      });
  };

  const getUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          user.admin = idTokenResult.claims.admin;
        setUser(user);
        })
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <Routes
        user={user}
        googleSignIn={googleSignIn}
        signIn={signIn}
        signOut={signOut}
      />
    </div>
  );
};

export default App;
