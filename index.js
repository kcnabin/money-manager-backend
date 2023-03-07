require('dotenv').config()
const http = require('http')
const app = require('./app')

const PORT = process.env.PORT || 8001

const server = http.createServer(app)

app.listen(PORT, () => {
  console.log(`Server running at  ${PORT}`)
})