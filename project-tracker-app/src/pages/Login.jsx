import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try { await login(email, pwd); nav("/"); }
    catch (e) { setErr(e.message); }
  };

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={pwd} onChange={e=>setPwd(e.target.value)} />
        {err && <p style={{color:'crimson'}}>{err}</p>}
        <button type="submit">Login</button>
      </form>
      <p>No account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
