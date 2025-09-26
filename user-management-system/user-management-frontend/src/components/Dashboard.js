import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserHome from './UserHome';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <p>Please login first</p>;

  switch(user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'moderator':
    case 'user':
      return <UserHome />;
    default:
      return <p>Role not recognized</p>;
  }
}
