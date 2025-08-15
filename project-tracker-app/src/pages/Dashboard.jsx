import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { deleteProject } from "../store/projectsSlice";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const projects = useSelector(s => s.projects.items);
  const dispatch = useDispatch();

  const progress = (p) => {
    const t = p.tasks ? Object.values(p.tasks) : [];
    const done = t.filter(x => x.completed).length;
    return `${done} of ${t.length} done`;
  };

  return (
    <div className="page">
      <header>
        <h2>Projects</h2>
        <div>
          <Link to="/add">+ Add Project</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <ul className="cards">
        {projects.map(p => (
          <li key={p.id} className="card">
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <small>{progress(p)}</small>
            <div className="row">
              <Link to={`/projects/${p.id}`}>Open</Link>
              <Link to={`/projects/${p.id}/edit`}>Edit</Link>
              <button onClick={() => dispatch(deleteProject({ uid: user.uid, id: p.id }))}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
