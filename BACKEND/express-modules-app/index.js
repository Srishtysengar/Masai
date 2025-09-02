const express = require("express");
const os = require("os");
const dns = require("dns");
const { readFileContent } = require("./read");

const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Welcome! Try /test, /readfile, /systemdetails, or /getip");
});

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", (req, res) => {
  readFileContent((data) => {
    res.send(data);
  });
});

app.get("/systemdetails", (req, res) => {
  const systemInfo = {
    platform: os.platform(),
    totalMemory: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`,
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length, 
  };
  res.json(systemInfo);
});

app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", { all: true }, (err, addresses) => {
    if (err) {
      res.json({ error: err.message });
    } else {
      res.json({
        hostname: "masaischool.com",
        ipAddresses: addresses.map((addr) => addr.address),
      });
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
