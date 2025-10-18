import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("email");// creating saved email
        const savedPassword = localStorage.getItem("password");//creating saved password
        if (savedEmail) setEmail(savedEmail);// if we have saved email use it
        if (savedPassword) setPassword(savedPassword);// same as email
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // save email and password to localstorage
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        const formObj = {
            email: e.target.email.value,//sets email as inputed value
            password: e.target.password.value//sets password as inputed value
        };

        try {
            const loggedInUser = await login(formObj);
            if (loggedInUser) {
                alert(`Logged in as: ${loggedInUser.fullname}`);// alerting that they logged in as their fullname
                navigate("/");//going back to home page
            }
        } catch (error) {
            alert("Login failed. Please check your credentials.");//alerts check credentials if incorrect
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm text-white"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>

                <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-2 mb-6 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LogIn;






