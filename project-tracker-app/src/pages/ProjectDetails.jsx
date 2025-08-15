import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTask, deleteTask, updateTask } from "../store/projectsSlice";
import { useAuth } from "../context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { format, isBefore } from "date-fns";

function useDebounce(v, ms=300) {
  const [d, setD] = useState(v);
  useEffect(() => { const t = setTimeout(()=>setD(v), ms); return () => clearTimeout(t); }, [v, ms]);
  return d;
}

export default function ProjectDetails() {
  const { id } = useParams();
  const p = useSelector(s => s.projects.items.find(x => x.id === id));
  const tasks = useMemo(() => p?.tasks ? Object.entries(p.tasks).map(([taskId, t]) => ({ taskId, ...t })) : [], [p]);
  const { user } = useAuth();
  const dispatch = useDispatch();

  // UI state
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("all");
  const [completed, setCompleted] = useState("all");
  const [sort, setSort] = useState("createdAt_desc");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const q = useDebounce(query, 350);

  const filtered = useMemo(() => {
    let list = tasks;
    if (q) list = list.filter(t => t.title.toLowerCase().includes(q.toLowerCase()));
    if (priority !== "all") list = list.filter(t => t.priority === priority);
    if (completed !== "all") list = list.filter(t => String(t.completed) === (completed === "true" ? "true" : "false"));

    const [field, dir] = sort.split("_"); // e.g. createdAt_desc
    list = [...list].sort((a,b) => (a[field] ?? 0) - (b[field] ?? 0));
    if (dir === "desc") list.reverse();
    return list;
  }, [tasks, q, priority, completed, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page-1)*pageSize, page*pageSize);

  // Task create
  const [title, setTitle] = useState("");
  const [prio, setPrio] = useState("medium");
  const [due, setDue] = useState("");

  const addNew = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const dueAt = due ? new Date(due).getTime() : null;
    await dispatch(addTask({ uid: user.uid, projectId: id, task: { title, priority: prio, dueAt } }));
    setTitle(""); setPrio("medium"); setDue("");
  };

  const toggleDone = (t) =>
    dispatch(updateTask({ uid: user.uid, projectId: id, taskId: t.taskId, updates: { completed: !t.completed }}));

  if (!p) return <div className="page">Project not found.</div>;

  return (
    <div className="page">
      <h2>{p.title}</h2>
      <p>{p.description}</p>

      <form onSubmit={addNew} className="row">
        <input placeholder="New task title..." value={title} onChange={e=>setTitle(e.target.value)} />
        <select value={prio} onChange={e=>setPrio(e.target.value)}>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
        <input type="date" value={due} onChange={e=>setDue(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>

      <div className="row">
        <input placeholder="Search tasks..." value={query} onChange={e=>setQuery(e.target.value)} />
        <select value={priority} onChange={e=>setPriority(e.target.value)}>
          <option value="all">All priorities</option>
          <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option>
        </select>
        <select value={completed} onChange={e=>setCompleted(e.target.value)}>
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Active</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="createdAt_desc">Newest</option>
          <option value="createdAt_asc">Oldest</option>
          <option value="priority_desc">Priority High→Low</option>
          <option value="priority_asc">Priority Low→High</option>
          <option value="dueAt_asc">Due Soonest</option>
          <option value="dueAt_desc">Due Latest</option>
        </select>
      </div>

      <ul className="tasks">
        {pageItems.map(t => {
          const overdue = t.dueAt && !t.completed && isBefore(new Date(t.dueAt), new Date());
          return (
            <li key={t.taskId} className={`task ${t.completed ? "done" : ""} ${overdue ? "overdue": ""}`}>
              <div>
                <input type="checkbox" checked={!!t.completed} onChange={() => toggleDone(t)} />
                <strong>[{t.priority}]</strong> {t.title}
                {t.dueAt && <small> • due {format(new Date(t.dueAt), "dd MMM yyyy")}</small>}
              </div>
              <div className="row">
                <button onClick={() => {
                  const nextTitle = prompt("Edit task title", t.title);
                  if (nextTitle != null)
                    dispatch(updateTask({ uid: user.uid, projectId: id, taskId: t.taskId, updates: { title: nextTitle } }));
                }}>Edit</button>
                <button onClick={() => dispatch(deleteTask({ uid: user.uid, projectId: id, taskId: t.taskId }))}>
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <span>{page}/{totalPages}</span>
        <button disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  );
}
