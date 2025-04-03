import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCfMoU_HHTOptHK9HMcyF5kNQm9CJ6XJak",
    authDomain: "react-firebase-bbe8a.firebaseapp.com",
    projectId: "react-firebase-bbe8a",
    storageBucket: "react-firebase-bbe8a.firebasestorage.app",
    messagingSenderId: "976261896323",
    appId: "1:976261896323:web:028e25c92459e5d70823b6",
    databaseURL: 'https://react-firebase-bbe8a-default-rtdb.firebaseio.com/'
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);