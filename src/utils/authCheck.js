const { successModel, errorModel } = require('../model/resModel.js')
const { getCookieExpires } = require('../utils/cookie.js')
const { GETNSC, GETID } = require('../utils/session.js')
// 登录验证
const loginCheck = (req) => {
  const { username } = req.session
  if (!username) {
    return new errorModel('尚未登录')
  }
}
// 返回值拦截
const resCheck = (res) => {
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
}
module.exports = {
  loginCheck,
  resCheck
}