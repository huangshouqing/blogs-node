const { set, get } = require('../db/redis.js');

(function () {
  let NSC = false // needSetCookie简写
  let ID = '' // sessionid
  const SESSION = async (req, sessionId) => {
    ID = req.cookie[sessionId];
    if (!ID) {
      NSC = true
      ID = `${Date.now()}_${Math.random()}`
      set(ID, {})
    }
    req.sessionId = ID
    const sessionData = await get(req.sessionId);
    if (sessionData == null) {
      // 初始化 redis 中的 session 值
      set(req.sessionId, {})
      // 初始化 session 值
      req.session = {}
    } else {
      // 设置 session 值
      req.session = sessionData
    }
  }
  // 获取needSetCookie
  const GETNSC = () => {
    return NSC
  }
  // 设置needSetCookie
  const SETNSC = (val) => {
    NSC = val
  }
  // 获取ID
  const GETID = () => {
    return ID
  }

  module.exports = {
    SESSION,
    GETNSC,
    SETNSC,
    GETID
  }
})()
