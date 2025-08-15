import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProject } from "../store/projectsSlice";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function EditProject() {
  const { id } = useParams();
  const p = useSelector(s => s.projects.items.find(x => x.id === id));
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useAuth();
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (p) { setTitle(p.title); setDesc(p.description || ""); }
  }, [p]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProject({ uid: user.uid, id, updates: { title, description: desc } }));
    nav("/");
  };

  if (!p) return <div className="page">Project not found.</div>;
  return (
    <form className="page" onSubmit={onSubmit}>
      <h2>Edit Project</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}
