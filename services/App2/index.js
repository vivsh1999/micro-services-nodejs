const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World 2!");
});

app.get("/app2", (req, res) => {
  res.send("/app2");
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
