import { useAuth } from "../AuthContext";

const LogIn = () => {
    const { login } = useAuth()
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formObj = {
            email: form.email.value,
            password: form.password.value
        };

        login(formObj)
    };
    return(
        <form onSubmit={handleSubmit}>
            <h1>LogIn</h1>

            
            <input type="text" name="email" placeholder="Enter email" required/>
            <input type="password" name="password" placeholder="Enter password" required/>

            <button>Submit</button>
        </form>
    )
}

export default LogIn