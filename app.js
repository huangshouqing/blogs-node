const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')
const { getQueryData, getPostData } = require('./src/utils/dataMount.js')
const { cookieParse, getCookieExpires } = require('./src/utils/cookie.js')
const { SESSION, GETNSC, SETNSC, GETID } = require('./src/utils/session.js')
// 所有的业务服务在这个文件中写
const serverHandle = async (req, res) => {
  res.setHeader('Content-type', 'application/json')
  // 处理queryData，将query挂载到req的query上
  req.query = getQueryData(req)
  // 解析cookie,将cookie挂载在req的cookie上
  cookieParse(req)
  // 解析session
  await SESSION(req, 'userid')
  // 处理postData，将postData挂载在req的body上
  req.body = await getPostData(req)
  // 等待路由返回的结果
  await handleBlogRouter(req, res)
  if (res.response && Object.keys(res.response).length > 0) {
    if (res.response.msg === '尚未登录') {
      res.writeHead(401)
    } else if (GETNSC()) {
      // 如果需要设置cookie的话
      // 服务端设置返回的cookie写入浏览器中
      res.setHeader('Set-Cookie', `userid=${GETID()};path=/; httpOnly;expires=${getCookieExpires(24 * 60 * 60 * 1000)}`)
    }
    return res.end(JSON.stringify(res.response))

  }
  await handleUserRouter(req, res)
  if (res.response && Object.keys(res.response).length > 0) {
    if (res.response.msg === '尚未登录') {
      res.writeHead(401)
    } else if (GETNSC()) {
      // 如果需要设置cookie的话
      // 服务端设置返回的cookie写入浏览器中
      res.setHeader('Set-Cookie', `userid=${GETID()};path=/; httpOnly;expires=${getCookieExpires(24 * 60 * 60 * 1000)}`)
    }
    return res.end(JSON.stringify(res.response))

  }
  // 未命中路由的话提示404
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('404 NOT Found')

}

module.exports = serverHandle