import { useAuth } from "../AuthContext";

const SignUp = () => {
    const { signup } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formObj = {
            fullname: form.fullname.value,
            email: form.email.value,
            password: form.password.value
        };

        signup(formObj)
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1>SignUp</h1>

            <input type="text" name="fullname" placeholder="Enter fullname" required/>
            <input type="text" name="email" placeholder="Enter email" required/>
            <input type="password" name="password" placeholder="Enter password" required/>

            <button>Submit</button>
        </form>
    )
}

export default SignUp