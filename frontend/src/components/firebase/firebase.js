import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.firebaseConfigApiKey,
  authDomain: process.env.firebaseConfigAuthDomain,
  databaseURL: process.env.firebaseConfigDatabaseUrl,
  projectId: process.env.firebaseConfigProjectId,
  storageBucket: process.env.firebaseConfigStorageBucket,
  messagingSenderId: process.env.firebaseConfigMessagingSenderId,
  appId: process.env.firebaseConfigAppId,
  measurementId: process.env.firebaseConfigMeasurementId
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const persistanceMode =
  process.env.FIREBASE_AUTH_PERSISTANCE === "test"
    ? firebase.auth.Auth.Persistence.NONE
    : firebase.auth.Auth.Persistence.SESSION;

firebase.auth().setPersistence(persistanceMode);

export const app = firebase.app();
export const auth = firebase.auth();
