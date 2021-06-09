const routeMatching = require('../utils/routeMatching.js')
const { login } = require('../controller/user.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { set } = require('./../db/redis')
const handleUserRouter = async (req, res) => {
  const router = new routeMatching(req, res)

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
      res.response = new successModel('登录成功')
    } else {
      res.response = new errorModel('登录失败')
    }
  })
  // 退出登录
  await router.get('/api/user/exit', async (req, res) => {
    // 将对应sessionId的值设为空即可
    set(req.sessionId, {})
    res.response = new successModel('退出成功')
  })
}

module.exports = handleUserRouter