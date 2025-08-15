import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import api from "../lib/axiosRTDB";

const databaseURL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

console.log("DB URL from env:", import.meta.env.VITE_FIREBASE_DATABASE_URL);

const userBase = (uid) => `/users/${uid}/projects`;

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    try {
      const res = await api.get("/projects.json");
      console.log("Firebase response:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching projects:", err);
      throw err;
    }
  }
);


export const addProject = createAsyncThunk(
  "projects/add",
  async ({ uid, payload }) => {
    const id = nanoid();
    const body = { ...payload, createdAt: Date.now(), tasks: {} };
    await api.put(`${userBase(uid)}/${id}.json`, body);
    return { id, ...body };
  }
);

export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ uid, id, updates }) => {
    await api.patch(`${userBase(uid)}/${id}.json`, updates);
    return { id, updates };
  }
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async ({ uid, id }) => {
    await api.delete(`${userBase(uid)}/${id}.json`);
    return id;
  }
);

export const addTask = createAsyncThunk(
  "projects/addTask",
  async ({ uid, projectId, task }) => {
    const taskId = nanoid();
    const body = {
      title: task.title,
      completed: !!task.completed,
      priority: task.priority || "medium",
      createdAt: Date.now(),
      dueAt: task.dueAt ?? null,
      order: task.order ?? Date.now(),
    };
    await api.put(`${userBase(uid)}/${projectId}/tasks/${taskId}.json`, body);
    return { projectId, taskId, task: body };
  }
);

export const updateTask = createAsyncThunk(
  "projects/updateTask",
  async ({ uid, projectId, taskId, updates }) => {
    await api.patch(`${userBase(uid)}/${projectId}/tasks/${taskId}.json`, updates);
    return { projectId, taskId, updates };
  }
);

export const deleteTask = createAsyncThunk(
  "projects/deleteTask",
  async ({ uid, projectId, taskId }) => {
    await api.delete(`${userBase(uid)}/${projectId}/tasks/${taskId}.json`);
    return { projectId, taskId };
  }
);


const projectsSlice = createSlice({
  name: "projects",
  initialState: { items: [], status: "idle", error: null },
  reducers: {
    upsertMany(state, action) {
      const byId = Object.fromEntries(state.items.map(p => [p.id, p]));
      action.payload.forEach(p => { byId[p.id] = p; });
      state.items = Object.values(byId);
    },
    replaceAll(state, action) {
      state.items = action.payload;
    },
    removeOne(state, action) {
      state.items = state.items.filter(p => p.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (s) => { s.status = "loading"; })
      .addCase(fetchProjects.fulfilled, (s, a) => { s.status = "succeeded"; s.items = a.payload; })
      .addCase(fetchProjects.rejected, (s, a) => { s.status = "failed"; s.error = a.error.message; })
      .addCase(addProject.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(updateProject.fulfilled, (s, a) => {
        const p = s.items.find(x => x.id === a.payload.id);
        if (p) Object.assign(p, a.payload.updates);
      })
      .addCase(deleteProject.fulfilled, (s, a) => {
        s.items = s.items.filter(p => p.id !== a.payload);
      })
      .addCase(addTask.fulfilled, (s, a) => {
        const p = s.items.find(x => x.id === a.payload.projectId);
        if (p) {
          p.tasks = p.tasks || {};
          p.tasks[a.payload.taskId] = a.payload.task;
        }
      })
      .addCase(updateTask.fulfilled, (s, a) => {
        const p = s.items.find(x => x.id === a.payload.projectId);
        if (p && p.tasks?.[a.payload.taskId]) {
          Object.assign(p.tasks[a.payload.taskId], a.payload.updates);
        }
      })
      .addCase(deleteTask.fulfilled, (s, a) => {
        const p = s.items.find(x => x.id === a.payload.projectId);
        if (p?.tasks?.[a.payload.taskId]) delete p.tasks[a.payload.taskId];
      });
  }
});

export const { upsertMany, replaceAll, removeOne } = projectsSlice.actions;
export default projectsSlice.reducer;

export function subscribeProjectsStream(uid, token, onData) {
  const url = `${databaseURL}/users/${uid}/projects.json?auth=${token}`;
  const es = new EventSource(url);

  es.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      const payload = msg?.data?.data;
      if (payload === null) {
        onData([]);
        return;
      }
      if (typeof payload === "object") {
        const arr = Array.isArray(payload)
          ? payload
          : Object.entries(payload).map(([id, v]) => ({ id, ...v }));
        onData(arr);
      }
    } catch {
      console.log("error");
    }
  };

  es.onerror = () => { };

  return () => es.close();
}
