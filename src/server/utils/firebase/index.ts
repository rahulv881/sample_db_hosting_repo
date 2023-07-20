// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPn2CnNUrpwN2mooV1WrGFLkbQwSnPz7k",
  authDomain: "sampledb20230720.firebaseapp.com",
  databaseURL: "https://sampledb20230720-default-rtdb.firebaseio.com",
  projectId: "sampledb20230720",
  storageBucket: "sampledb20230720.appspot.com",
  messagingSenderId: "924662638665",
  appId: "1:924662638665:web:f055c165372675083b3798",
  measurementId: "G-V21LQZSX49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);