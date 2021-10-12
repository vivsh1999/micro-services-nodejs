const express = require("express");

const app = express();

// express set config
app.set('trust proxy', true);
app.set('etag', false);

app.get("/", (req, res) => {
  res.send("Hello World 1!");
});
app.get("/app1", (req, res) => {
  res.send("/app1");
});

app.get('*', (req, res) => {
  res.json({app:1})
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
