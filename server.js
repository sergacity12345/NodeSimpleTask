// we import our http which is part of global module
const http = require('http')

const app = require('./app')


const port = process.env.PORT || 3000

const server = http.createServer(app)

server.listen(port)