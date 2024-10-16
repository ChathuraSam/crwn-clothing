// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-dvoxN6lgzxF5YyKsII9us76dr5aAc5U",
  authDomain: "crwn-clothing-db-cs.firebaseapp.com",
  projectId: "crwn-clothing-db-cs",
  storageBucket: "crwn-clothing-db-cs.appspot.com",
  messagingSenderId: "536928039146",
  appId: "1:536928039146:web:124eb059adf851ac13a793",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
