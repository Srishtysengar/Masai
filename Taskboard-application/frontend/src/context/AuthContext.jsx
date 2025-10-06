import {createContext, useState, useEffect} from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider= ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] =useState(true);
    
    useEffect(()=>{
        const token =localStorage.getItem("token");
        if(token){
            axios
            .get("http://localhost:5000/api/auth/profile",{
                headers: {Authorization: `Bearer ${token}`},
            })
            .then((res)=>setUser(res.data))
            .catch(()=>setUser(null))
            .finally(()=>setLoading(false));
        }else{
            setLoading(false);
        }
    },[]);

    const login = async (email, password)=>{
        const res = await axios.post("http://localhost:5000/api/auth/login",{
            email,
            password,
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
    };

    const register = async (name, email, password)=>{
        const res = await axios.post("http://localhost:5000/api/auth/register",{
            name,
            email,
            password,
        });
        localStorage.setItem("token", res.data.token);
        setUser(res.data);
    };

    const logout =()=>{
        localStorage.removeItem("token");
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user,login,register,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
