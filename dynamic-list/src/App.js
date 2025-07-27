import React from "react";
import UserList from "./UserList";

function App() {
  const initialUsers = [
    { name: "Aarav Sharma", email: "aarav@example.com", age: 25 },
    { name: "Meera Iyer", email: "meera@example.com", age: 30 },
  ];

  return <UserList initialUsers={initialUsers} />;
}

export default App;
