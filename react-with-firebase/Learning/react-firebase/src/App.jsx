import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/authForm";
import HomePage from "./components/pages/Home";
import { app } from "./firebase";

function App() {
  const auth = getAuth(app);

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm onSignup={handleSignup} onLogin={handleLogin} />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
