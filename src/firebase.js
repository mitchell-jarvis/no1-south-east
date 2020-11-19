import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/functions";



const firebaseConfig = {
    apiKey: "AIzaSyAMh_LPlNk1c-eF-RpoSCHxSdIF30AXoKM",
    authDomain: "no1southeast.firebaseapp.com",
    databaseURL: "https://no1southeast.firebaseio.com",
    projectId: "no1southeast",
    storageBucket: "no1southeast.appspot.com",
    messagingSenderId: "776369088967",
    appId: "1:776369088967:web:cd46485928ebf25be891e2"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
