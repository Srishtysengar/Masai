import { useEffect, useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function UserHome() {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  useEffect(()=>{
    const fetchProfile = async ()=>{
      const { data } = await API.get('/users/profile');
      setProfile(data);
    };
    fetchProfile();
  },[]);

  return (
    <div className="dashboard-container">
      <h2>Welcome {user.name} ({user.role})</h2>
      <p>Email: {profile.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
