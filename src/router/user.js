const routeMatching = require('../utils/routeMatching.js')
const { login } = require('../controller/user.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { set } = require('./../db/redis')
const handleUserRouter = async (req, res) => {
  const router = new routeMatching(req, res)
  let response = {}

  // 登录
  await router.post('/api/user/login', async (req, res) => {
    const { username, password } = req.body
    const data = await login(username, password)
    if (data && data.username) {
      // 服务端设置返回的cookie写入浏览器中
      req.session.username = data.username
      req.session.realname = data.realname
      // update redis
      set(req.sessionId, req.session)
      response = new successModel('登录成功')
    } else {
      response = new errorModel('登录失败')
    }
  })

  // // 登录验证
  // await router.get('/api/user/loginCheck', async (req, res) => {
  //   // 从cookie中读取信息
  //   const { username } = req.session
  //   if (username) {
  //     response = new successModel({ session: req.session }, '已登录')
  //   } else {
  //     response = new errorModel('尚未登录')
  //   }
  // })

  return response
}

module.exports = handleUserRouter