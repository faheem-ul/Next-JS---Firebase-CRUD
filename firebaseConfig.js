// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClswGeTzFYrQTCmrlD3ZdOh9bZQCJ1yGM",
  authDomain: "next-js-crud-6164f.firebaseapp.com",
  projectId: "next-js-crud-6164f",
  storageBucket: "next-js-crud-6164f.appspot.com",
  messagingSenderId: "337244924063",
  appId: "1:337244924063:web:1d5658d5fa8f83db1a5aaa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();
