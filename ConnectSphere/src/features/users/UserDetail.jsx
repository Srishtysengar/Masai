import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../api/client';
import { useFollow } from '../../hooks/useFollow';

export default function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const { isFollowing, follow, unfollow } = useFollow();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([
      client.get(`/users/${userId}`),
      client.get('/posts', { params: { userId } }),
    ])
      .then(([uRes, pRes]) => {
        if (!alive) return;
        setUser(uRes.data);
        setPosts(Array.isArray(pRes.data) ? pRes.data : []);
      })
      .catch((e) => { if (alive) setErr('Failed to load user'); console.error(e); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [userId]);

  if (loading) return <p style={{ padding: 16 }}>Loading profile…</p>;
  if (err) return <p style={{ padding: 16, color: 'crimson' }}>{err}</p>;
  if (!user) return null;

  const following = isFollowing(user.id);

  return (
    <div style={{ padding: 16, display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h2 style={{ margin: 0 }}>{user.name}</h2>
        {following ? (
          <button onClick={() => unfollow(user.id)}>Unfollow</button>
        ) : (
          <button onClick={() => follow(user)}>Follow</button>
        )}
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        <div><strong>Username:</strong> {user.username}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Website:</strong> {user.website}</div>
        <div><strong>Company:</strong> {user.company?.name}</div>
        <div>
          <strong>Address:</strong>{' '}
          {user.address
            ? `${user.address.suite}, ${user.address.street}, ${user.address.city} (${user.address.zipcode})`
            : '—'}
        </div>
      </div>

      <section>
        <h3 style={{ marginBottom: 8 }}>Posts</h3>
        {posts.length === 0 ? <p>No posts.</p> : (
          <ul style={{ display: 'grid', gap: 8, paddingLeft: 16 }}>
            {posts.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong>
                <div style={{ color: '#555' }}>{p.body}</div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}