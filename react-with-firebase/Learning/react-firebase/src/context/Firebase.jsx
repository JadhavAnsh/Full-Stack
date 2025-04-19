import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { createContext, useContext } from 'react';

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
export const FirebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(FirebaseApp);

const provider = new GoogleAuthProvider();

const db = getDatabase(FirebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    
    const handleSignup = async (email, password) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("✅ User signed up:", userCredential.user);
          return userCredential.user;
        } catch (error) {
          console.error(`❌ Signup Error: ${error.code} - ${error.message}`);
        }
    };
    
    const handleLogin = async (email, password) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("✅ User logged in:", userCredential.user);
          return userCredential.user;
        } catch (error) {
          console.error(`❌ Login Error: ${error.code} - ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("✅ User logged in with Google:", user);
            return user; // <-- this was missing!
        } catch (error) {
            console.error("❌ Google login error:", error);
            return null;
        }
    };
    

    const handleLogout = async () => {
        const auth = getAuth();
        try {
          await signOut(auth);
          console.log("User logged out successfully");
        } catch (error) {
          console.error(`Logout Error: ${error.code} - ${error.message}`);
        }
    };

    const addUser = (key, data) => {
        set(ref(db, 'users/' + key), data)
    };

  return (
    <FirebaseContext.Provider value={{ handleSignup, handleLogin, handleGoogleLogin, handleLogout, addUser }}>
        {props.children}
    </FirebaseContext.Provider>
  )
}
