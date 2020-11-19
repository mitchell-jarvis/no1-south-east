import React, { useState } from 'react';
import { Link } from '@reach/router'
import styles from './Register.module.scss'
import Logo from "../Logo/Logo";
import Footer from '../Footer';
import firebase, { firestore } from '../../firebase';

const Register = (props) => {
    const { user, signOut } = props;

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        const updateUserDetails = {...userDetails};
        updateUserDetails[`${e.target.id}`] = e.target.value;
        setUserDetails(updateUserDetails);
    }

    const registerUser = (e) => {
        e.preventDefault();

        firebase.auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password)
        .then(cred => {

            const userData = {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
            }

            firestore
                .collection('users')
                .doc(cred.user.uid)
                .set(userData);

        }).then(() => {
            setUserDetails({
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            })
        })
        .catch((error) => {
            console.log('sign up failed', error);
            alert(error);
        });
    }

    const checkSignIn = () => {
        if (user === null) {
            return (
                <div className={styles.register}>
                    <h3>Register to redeem great offers!</h3>
                    <form onSubmit={registerUser}>
                        <div className={styles.form_container}>
                            <input type="text" placeholder="First Name" id="firstName" onInput={handleInput} required />
                            <input type="text" placeholder="Last Name" id="lastName" onInput={handleInput} required />
                        </div>
                        <div className={styles.form_container}>
                            <input id="email" type="text" name="email" placeholder="Email Address" onInput={handleInput} required />
                            <input id="password" type="password" name="password" placeholder="Password" onInput={handleInput} required />
                        </div>
                        <p>By signing up you agree to our
                            <p className={styles.terms}>
                                <Link to="/terms-and-conditions">Terms and Conditions</Link>
                            </p> 
                        </p>
                        <button type="submit" className={styles.register_btn}>Register</button>
                    </form>
                    <p>Already have an account? 
                        <Link to="/sign-in">
                            <button>Sign in</button>
                        </Link>
                    </p>
                    <p className={styles.faqs}>Feeling inquisitive? Check out our
                        <Link to="/faq">FAQ's</Link>
                    </p>
                </div>
            )   
        } else {
            return (
                <div className={styles.signedInMessage}>
                    <h3>You are already signed in</h3>
                    <Link to="/browseDeals">
                        <button><span>Continue as </span> <span>{user.email}</span></button>
                    </Link>
                    <button onClick={signOut}>Sign Out</button>
                </div>    
            )   
        }
    }

    return(
        <>
            <div className={styles.page}>
                <Logo />
                <div className={styles.form}>
                    {checkSignIn()}
                </div>
            </div>
            <Footer/>
        </>
    )
};

export default Register;