const Routers = require('./src/utils/routes.js')
const { getQueryData, getPostData } = require('./src/utils/dataMount.js')
const { cookieParse } = require('./src/utils/cookie.js')
const { SESSION } = require('./src/utils/session.js')
require('./src/router/blog.js')
require('./src/router/user.js')
require('./src/router/book.js')
require('./src/router/movie.js')
require('./src/router/tv.js')
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
  await getPostData(req)
  // router入口
  Routers(req, res)
}


module.exports = serverHandle