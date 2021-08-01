
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBCS8D0tmLAvmQwIl3B52cWOgsufuVnyqc",
    authDomain: "react-app-curso-db3f3.firebaseapp.com",
    projectId: "react-app-curso-db3f3",
    storageBucket: "react-app-curso-db3f3.appspot.com",
    messagingSenderId: "1037576346761",
    appId: "1:1037576346761:web:8ac408505c70fa79f73a58"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider,
    firebase
}