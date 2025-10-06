/* eslint-disable no-unused-vars */
import  {useState} from "react";
import { AuthContext } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
import { useContext } from "react";

export default function Login () {
    const {register} = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await register(name,email, password);
            navigate("/dashboard")
        } catch (err) {
            alert("Registration Failed")
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
             type="name"
             placeholder="Name"
             value={name}
             onChange={(e)=> setName(e.target.value)}
             required
            /><br/>
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
            <button type="submit">Register</button>

        </form>
    )
}