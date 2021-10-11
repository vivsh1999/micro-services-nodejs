const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()

const service1Proxy = httpProxy('https://microservice1')
consoole.log('env', process.env)
// Authentication
app.use((req, res, next) => {
  // TODO: my authentication logic
  next()
})

// Proxy request
app.get('/app1', (req, res, next) => {
  service1Proxy(req, res, next)
})