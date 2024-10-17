/**
 *
 * https://firebase.google.com/docs/web/setup#available-libraries
 *
 * */

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-dvoxN6lgzxF5YyKsII9us76dr5aAc5U",
  authDomain: "crwn-clothing-db-cs.firebaseapp.com",
  projectId: "crwn-clothing-db-cs",
  storageBucket: "crwn-clothing-db-cs.appspot.com",
  messagingSenderId: "536928039146",
  appId: "1:536928039146:web:124eb059adf851ac13a793",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider);

const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  if (!userSnapShot.exists()) {
    // create
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log(
        "Error occured in creating db record",
        error
      );
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

/**
 * {
    "uid": "AsVCGZX8wUWFNdOb6xkFntoG8Cp1",
    "email": "chathura.samarajeewa@gmail.com",
    "emailVerified": true,
    "displayName": "Chathura Samarajeewa",
    "isAnonymous": false,
    "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJU55R_CEgg3kCR0cHCaEzLsAw72NhjUDn76NMZc31e_ZeVTWjY=s96-c",
    "providerData": [
        {
            "providerId": "google.com",
            "uid": "102016724408058227823",
            "displayName": "Chathura Samarajeewa",
            "email": "chathura.samarajeewa@gmail.com",
            "phoneNumber": null,
            "photoURL": "https://lh3.googleusercontent.com/a/ACg8ocJU55R_CEgg3kCR0cHCaEzLsAw72NhjUDn76NMZc31e_ZeVTWjY=s96-c"
        }
    ],
    "stsTokenManager": {
        "refreshToken": "AMf-vBwRK2VYSanE_jhprUEGyY72c7Cggvir6_LZWWr-IvM1dwzuzm2vh6tPsp5Ew5ewBFNWYzfTBs0J-FeNnbnQ7nlbh9AXZWqzEEr7a3j_xM9H_o56dZ1E0jq7PxV4GpJ3BxZ4SG-YT_zJNABABCYiWzjpWc1TsRAZQ2pdPV-5cmmA1fcQ5VinGg2TSWQhlb3yIASPX8XsvdxwNNmYssLAjMP7TAmLXtkxrjU8nRtnFrapF74imjEwZlAYhVZS1sYEWyFKPaJCCnlfDhqzzQt97rNDHdImIkqQPniE9JpFZctdHF3DWEMq_nlStghn7oHYRtEC2ND83f9QSgTZ-S6e5k_VGwLFsgEnO_9gtsrBiaUyLMPS3sfkk8IhEJz4ywhZFLiI5h7V4Yqk_j-uNRIUizbb_3hbR7dBrOxkXypkSRAa-B6PqpUMF49hS-Jmh1GiKs1GK5qDhWtoGmxZVmN-agtM__zyVQ",
        "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOWJlZmQzZWZmY2JiYzgyYzgzYWQwYzk3MmM4ZWE5NzhmNmYxMzciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2hhdGh1cmEgU2FtYXJhamVld2EiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlU1NVJfQ0VnZzNrQ1IwY0hDYUV6THNBdzcyTmhqVURuNzZOTVpjMzFlX1plVlRXalk9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY3J3bi1jbG90aGluZy1kYi1jcyIsImF1ZCI6ImNyd24tY2xvdGhpbmctZGItY3MiLCJhdXRoX3RpbWUiOjE3MjkxMDkzMzAsInVzZXJfaWQiOiJBc1ZDR1pYOHdVV0ZOZE9iNnhrRm50b0c4Q3AxIiwic3ViIjoiQXNWQ0daWDh3VVdGTmRPYjZ4a0ZudG9HOENwMSIsImlhdCI6MTcyOTEwOTMzMCwiZXhwIjoxNzI5MTEyOTMwLCJlbWFpbCI6ImNoYXRodXJhLnNhbWFyYWplZXdhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyMDE2NzI0NDA4MDU4MjI3ODIzIl0sImVtYWlsIjpbImNoYXRodXJhLnNhbWFyYWplZXdhQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.vBBR3ckY1u3dB6jXWG3o-OMljYe1EZukwx4UjoQ-ZHXi16OPW3x-1424U9y1ZgrWRiFJbaQEa4NcaBf27zTztbyxkclzZvFEnsRMJ5zsQ6AojhBd1YmLd32qy5TmQQkNH6ZX2hJ1eAalFc0QwvRGdNWOBAAx146YMbw-GOOW8qbu4E3qxxzYuloWDZfOOgSww6wmJ25mUHAa8QNb4oU3m82lNVXZC3nzpJhJlx_GcrBFzDo0voJPa_znJgcfU5CXTv7pBwsL8NmDydtL5eRDSn8eH8UprCdTGyGD4gqPkJRU38FOW1a_tYbjR3_tn1oHjoUHr3yWRxuPxHYoxP37Tg",
        "expirationTime": 1729112929790
    },
    "createdAt": "1729109250472",
    "lastLoginAt": "1729109250472",
    "apiKey": "AIzaSyA-dvoxN6lgzxF5YyKsII9us76dr5aAc5U",
    "appName": "[DEFAULT]"
}
 */
