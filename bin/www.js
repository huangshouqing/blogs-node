// 服务器
const http = require('http')

const serverHandle = require('../app')

const PORT = 8000

const server = http.createServer(serverHandle)

server.listen(PORT,()=>{
  console.log('server is running at http://127.0.0.1:8000')
})