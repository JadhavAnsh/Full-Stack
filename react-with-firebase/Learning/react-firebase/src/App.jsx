import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/authForm";
import HomePage from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Render AuthForm only at the root path */}
        <Route path="/" element={<AuthForm />} />
        {/* Render HomePage at the /home path */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;