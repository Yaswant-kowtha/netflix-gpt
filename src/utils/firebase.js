// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdov8mdPTTgfCtnFj_e1DtBV2Zkkek39E",
  authDomain: "netflix-gpt-b02e8.firebaseapp.com",
  projectId: "netflix-gpt-b02e8",
  storageBucket: "netflix-gpt-b02e8.appspot.com",
  messagingSenderId: "655889199656",
  appId: "1:655889199656:web:9650de4a75f20ae422fb1d",
  measurementId: "G-QZGZR5FEJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();