const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const { getQueryData, getPostData } = require('./src/utils/dataMount.js')
// 所有的业务服务在这个文件中写
const serverHandle = async (req, res) => {
  res.setHeader('Content-type', 'application/json')
  // 处理queryData，将query挂载到req的query上
  req.query = getQueryData(req)
  // 处理postData，将postData挂载在req的body上
  req.body = await getPostData(req)
  
  // 等待路由返回的结果
  const blogData = await handleBlogRouter(req, res)
  if (blogData && Object.keys(blogData).length > 0) {
    return res.end(JSON.stringify(blogData))

  }

  const userData = await handleUserRouter(req, res)
  if (userData && Object.keys(userData).length > 0) {
    return res.end(JSON.stringify(userData))

  }
  // 未命中路由的话提示404
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('404 NOT Found')

}

module.exports = serverHandle