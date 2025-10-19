import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom"; 

const SignUp = () => {
    const { signup } = useAuth();
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formObj = {
            fullname: form.fullname.value,// setting inputed value as as fullname
            email: form.email.value,// setting inputed value as  email
            password: form.password.value// setting inputed value as password
        };

        const newUser = await signup(formObj);
        if (newUser) {
            alert(`Signed up as: ${newUser.fullname}`);
            navigate("/login");  // redirect to login page
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm text-white" onSubmit={handleSubmit}>
                <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

                <input type="text" name="fullname" placeholder="Enter fullname" required className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <input type="text" name="email" placeholder="Enter email" required className="w-full p-2 mb-4 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <input type="password" name="password" placeholder="Enter password" required className="w-full p-2 mb-6 rounded bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-semibold transition-colors">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUp;

