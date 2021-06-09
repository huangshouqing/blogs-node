// 设置cookie过期时间
const getCookieExpires = (ExpiresTime) => {
  const d = new Date();
  d.setTime(d.getTime() + ExpiresTime)
  return d.toGMTString()
}

/**
 * 解析cookie,将cookie挂载在req的cookie上
 * @param {*} req 
 * @returns 
 */
const cookieParse = (req) => {
  const cookieStr = req.headers.cookie || ''
  const cookieArr = {}
  cookieStr.split(';').forEach(i => {
    if (!i) {
      return
    }
    const arr = i.split('=')
    cookieArr[arr[0].trim()] = arr[1].trim()
  });
  return req.cookie = cookieArr
}

module.exports = {
  cookieParse,
  getCookieExpires
}