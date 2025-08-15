import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../store/projectsSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const { user } = useAuth();
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await dispatch(addProject({ uid: user.uid, payload: { title, description: desc } }));
    nav("/");
  };

  return (
    <form className="page" onSubmit={onSubmit}>
      <h2>Add Project</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" />
      <button type="submit">Save</button>
    </form>
  );
}
