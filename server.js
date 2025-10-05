import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("<h1>Helllo from the root route</h1>");
});

app.get("/hi", (req, res) => {
  return res.send("<h2>Hello universe</h2>");
});

app.listen(5000, () => console.log("server is running"));
