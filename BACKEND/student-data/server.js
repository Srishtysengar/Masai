const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};


const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

app.post("/students", (req, res) => {
  const db = readDB();
  const newStudent = req.body;

  if (!newStudent.name || !newStudent.course || !newStudent.batch) {
    return res.status(400).json({ error: "Name, course, and batch are required" });
  }

  newStudent.id = db.students.length ? db.students[db.students.length - 1].id + 1 : 1;
  db.students.push(newStudent);
  writeDB(db);

  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  const db = readDB();
  res.json(db.students);
});

app.get("/students/:id", (req, res) => {
  const db = readDB();
  const student = db.students.find((s) => s.id === parseInt(req.params.id));

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/students/:id", (req, res) => {
  const db = readDB();
  const index = db.students.findIndex((s) => s.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  db.students[index] = { ...db.students[index], ...req.body };
  writeDB(db);

  res.json(db.students[index]);
});

app.delete("/students/:id", (req, res) => {
  const db = readDB();
  const index = db.students.findIndex((s) => s.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const removed = db.students.splice(index, 1);
  writeDB(db);

  res.json(removed[0]);
});

app.get("/students/search", (req, res) => {
  const { course } = req.query;
  if (!course) {
    return res.status(400).json({ error: "Course query param is required" });
  }

  const db = readDB();
  const matches = db.students.filter((s) =>
    s.course.toLowerCase().includes(course.toLowerCase())
  );

  if (matches.length === 0) {
    return res.json({ message: "No students found" });
  }

  res.json(matches);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Student API 🚀");
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
