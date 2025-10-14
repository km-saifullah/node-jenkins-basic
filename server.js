import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.send("<h1>Welcome from the API</h1>");
});

app.get("/sayhi", (req, res) => {
  return res.send("<h2>Hello World</h2>");
});

app.get("/bye", (req, res) => {
  return res.send("<h1>Bye world!</h1>");
});

app.listen(5000, () => console.log("server is running"));
