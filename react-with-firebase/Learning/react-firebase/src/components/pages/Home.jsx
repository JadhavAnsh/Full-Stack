import { useLocation, useNavigate } from 'react-router-dom';
import { useFirebase } from '../../context/firebase';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "No Email";

  const firebase = useFirebase();

  const Logout = async () => {
    try {
      await firebase.handleLogout();
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
        <button onClick={() => Logout()}>
          LogOut
        </button>
      </div>
      </div>
    </>
  );
}

export default HomePage;
