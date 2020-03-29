import firebase from "firebase";

let firebaseConfig: {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  firebaseConfig = {
    apiKey: "AIzaSyAQmEMptTr-b5o-7wH4H34AeNsHBBxKmKA",
    authDomain: "queueme-dev.firebaseapp.com",
    databaseURL: "http://localhost:8080",
    projectId: "queueme-dev",
    storageBucket: "queueme-dev.appspot.com",
    messagingSenderId: "895362788864",
    appId: "1:895362788864:web:5057a83a2f2c99867b72e5"
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyAQmEMptTr-b5o-7wH4H34AeNsHBBxKmKA",
    authDomain: "queueme-dev.firebaseapp.com",
    databaseURL: "https://queueme-dev.firebaseio.com",
    projectId: "queueme-dev",
    storageBucket: "queueme-dev.appspot.com",
    messagingSenderId: "895362788864",
    appId: "1:895362788864:web:5057a83a2f2c99867b72e5"
  };
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const app = firebase.app();
export const auth = firebase.auth();
