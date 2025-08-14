/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState, useEffect } from 'react';

const FollowContext = createContext(null);

export function FollowProvider({ children }) {
  const [followed, setFollowed] = useState(() => {
    try {
      const raw = localStorage.getItem('followed_users');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('followed_users', JSON.stringify(followed));
    } catch {console.log("Error 404") }
  }, [followed]);

  const follow = (user) =>
    setFollowed((prev) => (prev.some((u) => u.id === user.id) ? prev : [...prev, user]));

  const unfollow = (id) =>
    setFollowed((prev) => prev.filter((u) => u.id !== id));

  const isFollowing = (id) => followed.some((u) => u.id === id);

  const value = useMemo(() => ({ followed, follow, unfollow, isFollowing }), [followed]);

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export function useFollowContext() {
  const ctx = useContext(FollowContext);
  if (!ctx) throw new Error('useFollowContext must be used within FollowProvider');
  return ctx;
}