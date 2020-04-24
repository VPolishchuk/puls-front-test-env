import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAnsMlQmOZUPOhBEoWNhfOUnLx8aazI43w",
  authDomain: "puls-website.firebaseapp.com",
  databaseURL: "https://puls-website.firebaseio.com",
  projectId: "puls-website",
  storageBucket: "puls-website.appspot.com",
  messagingSenderId: "628982705884",
  appId: "1:628982705884:web:f0967a8d92f9cde4de8e19",
  measurementId: "G-3SX237FPMN"
});

app.analytics();

// firebase.analytics()

export default app;
