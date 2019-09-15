const server = require('./server.js')
require('dotenv').config();

const port = process.env.PORT ||   6000

server.listen(port, () => {
  console.log(`Api Running on port: ${port}`)
})
