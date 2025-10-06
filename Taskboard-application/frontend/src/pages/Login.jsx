/* eslint-disable no-unused-vars */
import  {useState} from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";

export default function Login () {
    const {login} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard")
        } catch (err) {
            alert("Invalid credentials")
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
             type="email"
             placeholder="Email"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
             required
            /><br/>
            <input
            type="password"
             placeholder="Password"
             value={password}
             onChange={(e)=> setPassword(e.target.value)}
             required
            /><br/>
            <button type="submit">Login</button>

        </form>
    )
}