const express = require('express')
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const app = express()

// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next()
})

app.get('/', (req, res, next) => {
  res.send("hello from the gateway")
})
app.get('/env', (req, res, next) => {
  res.json(JSON.stringify(process.env))
})

// Proxy request
app.get('/app1', (req, res, next) => {
  try{
  apiProxy.web(req, res, {
    target: `http://microservice1:${process.env.SERVICE1_PORT}`,
    changeOrigin: true,
  })}catch(err){}
})
app.get('/app2', (req, res, next) => {
  try{apiProxy.web(req, res, {
    target: `http://microservice2:${process.env.SERVICE2_PORT}`,
    changeOrigin: true,
  })}catch(err){}
})
app.get('/app3', (req, res, next) => {
  try{apiProxy.web(req, res, {
    target: `http://microservice3:${process.env.SERVICE3_PORT}`,
    changeOrigin: true,
  })}catch(err){}
})

const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
  console.log(`Listening on ${APP_PORT}`);
});