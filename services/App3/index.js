const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World 3!");
});

app.get("/app3", (req, res) => {
  res.send("/app3");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
