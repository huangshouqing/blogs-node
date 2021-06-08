const routeMatching = require('../utils/routeMatching.js')
const { login } = require('../controller/user.js')
const { successModel, errorModel } = require('../model/resModel.js')
const handleUserRouter = async (req, res) => {
  const router = new routeMatching(req, res)
  let response = {}

  await router.post('/api/user/login', async (req, res) => {
    const { username, password } = req.body
    const data = await login(username, password)
    if (data.username) {
      response = new successModel('登录成功')
    } else {
      response = new errorModel('登录失败')
    }
  })

  return response
}

module.exports = handleUserRouter