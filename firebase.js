// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpaIf6BQ_IQM7s_wP4wA-8LBosaPhpKFM",
    authDomain: "mai-app-jlm.firebaseapp.com",
    projectId: "mai-app-jlm",
    storageBucket: "mai-app-jlm.appspot.com",
    messagingSenderId: "941253016294",
    appId: "1:941253016294:web:4e210dfe94268f7d1c9927",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const auth = getAuth(app);

export const firestore = getFirestore();
