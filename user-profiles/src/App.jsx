import React, { useEffect, useState } from "react";
import UserCard from "./components/UserCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>User Profiles</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}

      {!loading && !error && filteredUsers.length === 0 && (
        <p>No users match your search.</p>
      )}

      {!loading &&
        !error &&
        filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
    </div>
  );
};

export default App;
