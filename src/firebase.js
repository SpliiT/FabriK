// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_9AY-HsRdgLXOe_5tsV62bB2w13nWJpU",
  authDomain: "fabrik-social.firebaseapp.com",
  projectId: "fabrik-social",
  storageBucket: "fabrik-social.firebasestorage.app",
  messagingSenderId: "993436196315",
  appId: "1:993436196315:web:ad48ae201da2ce28ae1bfe",
  measurementId: "G-SRMR14VMSV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);