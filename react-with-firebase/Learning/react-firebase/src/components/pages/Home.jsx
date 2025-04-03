import { getAuth, signOut } from "firebase/auth";
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "No Email";

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(`Logout Error: ${error.code} - ${error.message}`);
    }
  };

  return (
   <>
      <div>
        <h1 className="text-2xl">Welcome, {email}!</h1>
        <div className='card'>
        <button onClick={() => handleLogout()}>
          LogOut
        </button>
      </div>
      </div>
    </>
  );
}

export default HomePage;
