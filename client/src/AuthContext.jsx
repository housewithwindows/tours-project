/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API_URL = 'http://localhost:3000/api';

export const AuthProivder = ({ children }) => {
    const [user, setUser] = useState(null);



    const login = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObj),
                credentials: 'include'
            });

            const result = await res.json();

            if(!res.ok) {
                throw new Error(result.message);
            };

            setUser(result.data.user);
        } catch(err) {
            alert(err.message)
        }
    }

    const signup = async (formObj) => {
        try {
            const res = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObj)
            });

            console.log(res)

            const data = await res.json();

            alert(data.message);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{signup, login, user}}>
            {children}
        </AuthContext.Provider>
    )
};
