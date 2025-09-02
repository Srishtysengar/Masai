const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

app.get("/home", (req, res) => {
  res.send("This is home page");
});

app.get("/contactus", (req, res) => {
  res.send("Contact us at contact@contact.com");
});

app.get("/about", (req, res) => {
  res.send("Welcome to the About page!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
