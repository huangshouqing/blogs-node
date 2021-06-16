const Routes = require('../utils/routes.js')
const { login, register } = require('../controller/user.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { set } = require('./../db/redis')
const { resCheck } = require('../utils/authCheck.js')


// 登录
Routes.post('/api/user/login', async (req, res) => {
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
  resCheck(res)
})
// 注册用户
Routes.post('/api/user/register', async (req, res) => {
  const { username, password, realname } = req.body;
  const data = await register(username, password, realname)
  if (data && data.code === 0) {
    res.response = new successModel('注册成功')
  } else if (data.code === -2) {
    res.response = new errorModel('用户名已存在')
  } else {
    res.response = new errorModel('注册失败')
  }
  resCheck(res)
})
// 退出登录
Routes.get('/api/user/exit', async (req, res) => {
  // 将对应sessionId的值设为空即可
  set(req.sessionId, {})
  res.response = new successModel('退出成功')
  resCheck(res)
})
