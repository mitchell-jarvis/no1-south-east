import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import styles from "./SignIn.module.scss";
import Logo from "../Logo/Logo";
import Footer from "../Footer";

const SignIn = (props) => {
  const { user, googleSignIn, signIn, signOut } = props;
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect((user) => {
    if (user) navigate("/browseDeals");
  }, []);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  const handleGoogleSignInClick = (e) => {
    e.preventDefault();
    googleSignIn();
  };

  const checkSignIn = () => {
    if (user === null) {
      return (
        <div className={styles.signin}>
          <h3>Welcome back!</h3>
          <form action="" onSubmit={handleSignInClick}>
            <div className={styles.form_container}>
              <input
                type="text"
                name="email"
                placeholder="Email Address"
                onChange={handleEmailChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                required
              />
            </div>
            <button type="submit" className={styles.sign_in_btn}>
              Sign in
            </button>
            <div className={styles.googleBtn} onClick={handleGoogleSignInClick}>
              <div className={styles.googleIconWrapper}>
                <img
                  className={styles.googleIcon}
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google logo"
                />
              </div>
              <p className={styles.btnText}>
                <b>Sign in with Google</b>
              </p>
            </div>
          </form>
          <p className={styles.terms}>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
          </p>
          <p>
            New to the area?
            <Link to="/register">
              <button> Create an account</button>
            </Link>
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles.signedInMessage}>
          <h3>You are already signed in</h3>
          <Link to="/browseDeals">
            <button>
              <span>Continue as </span> <span>{user.email}</span>
            </button>
          </Link>
          <button onClick={signOut}>Sign Out</button>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.page}>
        <Logo />
        <div className={styles.form}>{checkSignIn()}</div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
