import { firebase } from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "ground-fault-detector.firebaseapp.com",
  projectId: "ground-fault-detector",
  storageBucket: "ground-fault-detector.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
