import firebase from "firebase/app";
import "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "covid-help-9ba87.firebaseapp.com",
    projectId: "covid-help-9ba87",
    storageBucket: "covid-help-9ba87.appspot.com",
    messagingSenderId: "611166860804",
    appId: "1:611166860804:web:e74a3eb3f461624baba751",
    measurementId: "G-CWGMFCEKXW"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
