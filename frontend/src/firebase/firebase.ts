import firebase from "firebase";

export const initFirebase = async () => {
  console.log(firebase.apps.length);
  if (firebase.apps.length === 0) {
    const response = await fetch("/__/firebase/init.json");
    const config = await response.json();
    firebase.initializeApp(config);
  }
};
