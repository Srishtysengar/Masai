const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = "./db.json";

function readData() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
  res.send("🍴 Welcome to Dishes API! Try /dishes");
});


app.post("/dishes", (req, res) => {
  const dishes = readData();
  const newDish = { id: Date.now(), ...req.body };
  dishes.push(newDish);
  writeData(dishes);
  res.status(201).json(newDish);
});

app.get("/dishes", (req, res) => {
  res.json(readData());
});

app.get("/dishes/:id", (req, res) => {
  const dishes = readData();
  const dish = dishes.find((d) => d.id == req.params.id);
  if (dish) {
    res.json(dish);
  } else {
    res.status(404).json({ error: "Dish not found" });
  }
});

app.put("/dishes/:id", (req, res) => {
  let dishes = readData();
  const index = dishes.findIndex((d) => d.id == req.params.id);

  if (index !== -1) {
    dishes[index] = { ...dishes[index], ...req.body };
    writeData(dishes);
    res.json(dishes[index]);
  } else {
    res.status(404).json({ error: "Dish not found" });
  }
});

app.delete("/dishes/:id", (req, res) => {
  let dishes = readData();
  const index = dishes.findIndex((d) => d.id == req.params.id);

  if (index !== -1) {
    const deleted = dishes.splice(index, 1);
    writeData(dishes);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: "Dish not found" });
  }
});

app.get("/dishes/get", (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Missing name query" });

  const dishes = readData();
  const matches = dishes.filter((d) =>
    d.name.toLowerCase().includes(name.toLowerCase())
  );

  if (matches.length > 0) {
    res.json(matches);
  } else {
    res.json({ message: "No dishes found" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
