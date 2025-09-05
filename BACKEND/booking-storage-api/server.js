const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = "db.json";

const readDB = () => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return { books: [] };
  }
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: "All fields (title, author, year) are required" });
  }

  const db = readDB();
  const newBook = { id: db.books.length + 1, title, author, year };
  db.books.push(newBook);
  writeDB(db);

  res.status(201).json(newBook);
});

app.get("/books", (req, res) => {
  const db = readDB();
  res.status(200).json(db.books);
});

app.get("/books/:id", (req, res) => {
  const db = readDB();
  const book = db.books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

app.put("/books/:id", (req, res) => {
  const { title, author, year } = req.body;
  const db = readDB();
  const bookIndex = db.books.findIndex((b) => b.id === parseInt(req.params.id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  db.books[bookIndex] = {
    ...db.books[bookIndex],
    title: title || db.books[bookIndex].title,
    author: author || db.books[bookIndex].author,
    year: year || db.books[bookIndex].year,
  };

  writeDB(db);
  res.json(db.books[bookIndex]);
});

app.delete("/books/:id", (req, res) => {
  const db = readDB();
  const newBooks = db.books.filter((b) => b.id !== parseInt(req.params.id));

  if (newBooks.length === db.books.length) {
    return res.status(404).json({ error: "Book not found" });
  }

  db.books = newBooks;
  writeDB(db);
  res.json({ message: "Book deleted" });
});

app.get("/books/search", (req, res) => {
  const { author, title } = req.query;
  const db = readDB();

  let results = db.books;

  if (author) {
    results = results.filter((b) =>
      b.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (title) {
    results = results.filter((b) =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (results.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.json(results);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Book API 📚");
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
