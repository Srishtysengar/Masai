import { Link } from 'react-router-dom';
import { useFollow } from '../hooks/useFollow';

export default function Following() {
  const { followed, unfollow } = useFollow();

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Following</h2>
      {followed.length === 0 ? (
        <p>You’re not following anyone yet. Go to <Link to="/">Home</Link> and follow users.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 16
        }}>
          {followed.map((u) => (
            <div key={u.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
              <h3 style={{ margin: '0 0 4px' }}>
                <Link to={`/users/${u.id}`} style={{ textDecoration: 'none' }}>{u.name}</Link>
              </h3>
              <div style={{ color: '#555', fontSize: 14 }}>
                @{u.username} · {u.email}
              </div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => unfollow(u.id)}>Unfollow</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}