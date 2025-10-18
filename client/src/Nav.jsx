import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Nav = () => {
    const { user } = useAuth();

    return (
        <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Tourify</h2>
            <div className="space-x-4">
                <Link className="hover:underline" to="/">Home</Link>
                
                
                    <>
                        <Link className="hover:underline" to="/login">Log In</Link>
                        <Link className="hover:underline" to="/signup">Sign Up</Link>
                    </>
                 

                {user && (
                    <>
                        <Link className="hover:underline" to="/profile">Profile</Link>
                        <Link className="hover:underline" to="/tours">Tours</Link>
                        <Link className="hover:underline" to="/logout">LogOut</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;


