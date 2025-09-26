import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data.user, data.token);
      navigate('/dashboard'); // redirect after login
    } catch(err){
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
