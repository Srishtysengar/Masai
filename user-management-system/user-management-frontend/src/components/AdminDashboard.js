import { useState, useEffect, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const [users,setUsers] = useState([]);

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const { data } = await API.get('/users');
      setUsers(data);
    };
    fetchUsers();
  },[]);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <h3>All Users:</h3>
      <ul>
        {users.map(u=>(
          <li key={u._id}>{u.name} - {u.role}</li>
        ))}
      </ul>
    </div>
  );
}
