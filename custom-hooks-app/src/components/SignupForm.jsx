import React from "react";
import useForm from "../hooks/useForm";

export default function SignupForm() {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${values.name}, Email: ${values.email}`);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
