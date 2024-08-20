import firebase from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey:"",
  authDomain: "facialrecon-fe331.firebaseapp.com",
  projectId: "facialrecon-fe331",
  storageBucket: "facialrecon-fe331.appspot.com",
  messagingSenderId: "446504906532",
  appId: "1:446504906532:android:f170dd4f10dbbe9d84cdb1",
  databaseURL: "https://facialrecon-fe331.firebaseio.com"
//   measurementId: "YOUR_MEASUREMENT_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
