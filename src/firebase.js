// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Replace this with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDF47RZbZsjhBwPCk-vRow-mysVpZ-9OgE",
    authDomain: "familywings-7cb24.firebaseapp.com",
    projectId: "familywings-7cb24",
    storageBucket: "familywings-7cb24.appspot.com",
    messagingSenderId: "826029832235",
    appId: "1:826029832235:web:be795860a94cecfdc7926e",
    measurementId: "G-9BSC6JPLGT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const db = getFirestore(firebaseApp);



export { auth, storage, db };
