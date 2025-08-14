import { Link } from 'react-router-dom';
import { useFollow } from '../../hooks/useFollow';

export default function UserCard({ user }) {
  const { isFollowing, follow, unfollow } = useFollow();
  const following = isFollowing(user.id);

  return (
    <div style={{
      border: '1px solid #eee', borderRadius: 8, padding: 12,
      display: 'grid', gap: 8, background: '#fff'
    }}>
      <div>
        <h3 style={{ margin: '0 0 4px' }}>
          <Link to={`/users/${user.id}`} style={{ textDecoration: 'none' }}>
            {user.name}
          </Link>
        </h3>
        <div style={{ color: '#555', fontSize: 14 }}>
          @{user.username} · {user.email}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Link to={`/users/${user.id}`}><button>View Profile</button></Link>
        {following ? (
          <button onClick={() => unfollow(user.id)}>Unfollow</button>
        ) : (
          <button onClick={() => follow(user)}>Follow</button>
        )}
      </div>
    </div>
  );
}