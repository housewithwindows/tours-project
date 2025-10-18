import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clears user
    navigate("/signup"); // redirect to signup page
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white px-4">
      <h2 className="mb-6 text-2xl font-semibold">Ready to log out?</h2>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;


