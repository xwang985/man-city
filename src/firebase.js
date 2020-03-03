import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIxoHfh4DGbMjTwd1bvCBZjAi-cPc8HJo",
  authDomain: "m-city-5cc36.firebaseapp.com",
  databaseURL: "https://m-city-5cc36.firebaseio.com",
  projectId: "m-city-5cc36",
  storageBucket: "m-city-5cc36.appspot.com",
  messagingSenderId: "591249378029",
  appId: "1:591249378029:web:85d052c3c2539b6a159ae4",
  measurementId: "G-LXVF0ZM00T"
};
firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const firebasePromotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");
const firebaseStorage = firebase.storage();

const firebaseUrl = (dir, filename) => {
  return firebaseStorage
    .ref(dir)
    .child(filename)
    .getDownloadURL();
};

// const firebaseAuth = ({ email, password }) =>
//   firebase.auth().signInWithEmailAndPassword(email, password);

const firebaseSignIn = props =>
  firebase.auth().signInWithEmailAndPassword(props.email, props.password);

const firebaseLogout = () => {
  return firebase
    .auth()
    .signOut()
    .then(console.log("logout successfully"), error => {
      console.log("Error logging out");
    });
};

export {
  firebase,
  firebaseDB,
  firebaseMatches,
  firebasePromotions,
  firebaseLogout,
  firebaseTeams,
  firebasePlayers,
  firebaseStorage,
  firebaseUrl,
  firebaseSignIn
};
