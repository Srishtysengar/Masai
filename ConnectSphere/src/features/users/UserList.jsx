import { useEffect, useState } from 'react';
import client from '../../api/client';
import UserCard from './UserCard';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    client.get('/users')
      .then(({ data }) => { if (alive) setUsers(data); })
      .catch((e) => { if (alive) setErr('Failed to load users'); console.error(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  if (loading) return <p style={{ padding: 16 }}>Loading users…</p>;
  if (err) return <p style={{ padding: 16, color: 'crimson' }}>{err}</p>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 16
      }}>
        {users.map((u) => <UserCard key={u.id} user={u} />)}
      </div>
      

      <footer style={{margin:32,textAlign:'center',padding:'16,color:black'}}>
        Created by Srishty sengar
      </footer>
    </div>
  );
}