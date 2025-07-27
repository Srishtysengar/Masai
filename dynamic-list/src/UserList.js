import React, { useState } from "react";
import UserCard from "./UserCard";

function UserList({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (validate()) {
      setUsers([
        ...users,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          age: Number(formData.age),
        },
      ]);
      setFormData({ name: "", email: "", age: "" });
      setErrors({});
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User List</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users.map((user, idx) => (
          <UserCard key={idx} {...user} />
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Add a New User</h2>
      <form onSubmit={handleAddUser} style={{ maxWidth: "400px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.name}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.email}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Age: </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
          {errors.age && (
            <p style={{ color: "red", margin: "5px 0" }}>{errors.age}</p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add User
        </button>
      </form>
    </div>
  );
}

export default UserList;
