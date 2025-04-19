import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const firebase = useFirebase();
  console.log(firebase);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let user;
      if (isSignup) {
        user = await firebase.handleSignup(email, password);
        firebase.addUser(user.uid , { email });
      } else {
        user = await firebase.handleLogin(email, password);
      }
  
      if (user) {
        navigate("/home", { state: { email: user.email } });
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div>
      <form className="bg-white p-6 rounded-lg shadow-lg text-black w-80" onSubmit={handleSubmit}>
        <h2 className="text-center text-2xl font-bold mb-4">{isSignup ? "Sign Up" : "Login"}</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <button type="button" onClick={() => setIsSignup(!isSignup)} className="w-full mt-2 text-blue-500">
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
      </form>
      <div onClick= { async () => {
        try {
          const user = await firebase.handleGoogleLogin();
          if (user) {
            await firebase.addUser(user.uid, { email: user.email });
            navigate("/home", { state: { email: user.email } });
          }
        } catch (error) {
          console.error("❌ Google Login Error:", error);
        }
      }}
      className="flex items-center justify-center mt-4 bg-white p-2 rounded-lg shadow-lg text-black font-bold">
        <p>Continue with Google</p>
      </div>
    </div>
  );
};

export default AuthForm;
