import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UserList from './features/users/UserList';
import UserDetail from './features/users/UserDetail';
import Following from './pages/Following';

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <Header />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
        <Route path="/following" element={<Following />} />
      </Routes>
    </div>
  );
}