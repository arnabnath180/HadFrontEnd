// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBbX6akFgEnpM1R4mgV3lMOhC3zFA3ycU",
  authDomain: "otp-project1.firebaseapp.com",
  projectId: "otp-project1",
  storageBucket: "otp-project1.appspot.com",
  messagingSenderId: "237670851214",
  appId: "1:237670851214:web:4ac5f4403e3c810cb35fdf",
  measurementId: "G-MSLBG6EGBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)