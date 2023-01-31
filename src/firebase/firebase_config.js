
import { Appearance } from "react-native";
import {getAnalytics} from 'firebase/analytics';
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import uuid from 'react-native-uuid';
import { GoogleAuthProvider } from "firebase/auth";


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz47fF79gw1JGAgbpb-mtESmoY21dfNq0",
  authDomain: "lendsqr-fp-news-76c38.firebaseapp.com",
  projectId: "lendsqr-fp-news-76c38",
  storageBucket: "lendsqr-fp-news-76c38.appspot.com",
  messagingSenderId: "140482479176",
  appId: "1:140482479176:web:564821393cb95d83d4447d",
  measurementId: "G-E8FHB9XXWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

let Firebase = initializeApp(firebaseConfig);
  const firestoreDB = getFirestore(Firebase);
  const provider = new GoogleAuthProvider()
  const usersCollection = collection(firestoreDB, "users");
  const usersDB = doc(firestoreDB, 'users', uuid.v4());

  const auth = getAuth(Firebase)

  const setEmailAndPassword = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  };

  const getUserCollection = () => {
    getDocs(usersCollection)
      .then((snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
          users.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        console.log('real deal');
        console.log('current user',users, 'current user');
        console.log('real deal');
      })
      .catch((err) => {
        console.log(err);
      });
  };



  export {auth, provider,  usersCollection, usersDB, setEmailAndPassword, getUserCollection}