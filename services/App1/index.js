const express = require("express");
const axios = require("axios");
const { GET_ASYNC, SET_ASYNC } = require("./redis-cache.js");

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

// Third Party API
app.get("/users", async (req, res) => {
  try {
    const THIRTY_SECONDS = 30;
    const cacheResponse = await GET_ASYNC("userData");
    if (cacheResponse) {
      res.send(JSON.parse(cacheResponse));
      return;
    }
    const response = await axios.get("https://reqres.in/api/users?delay=3");
    await SET_ASYNC(
      "userData",
      JSON.stringify(response.data),
      "EX",
      THIRTY_SECONDS,
    );
    res.send(response.data);
  } catch (error) {
    res.send(error.message);
  }
});

app.get('*', (req, res) => {
  res.json({app:1})
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
