import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let user;
      if (isSignup) {
        user = await onSignup(email, password);
      } else {
        user = await onLogin(email, password);
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
    </div>
  );
};

export default AuthForm;
