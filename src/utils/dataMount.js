const queryString = require('querystring')
// 处理postData函数
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    // 如果请求方式不是post，不予处理
    if (req.method !== 'POST') {
      return resolve({})
    }
    // 如果数据格式不是json的话，不予处理
    // if (req.headers['content-type'] !== 'application/json') {
    //   return resolve({})
    // }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      //  post数据接收完毕
      if (postData.length === 0) {
        return resolve({})
      }
      return resolve(
        JSON.parse(postData)
      )
    })
  })
}
// 处理queryData函数
const getQueryData = (req) => {
  return queryString.parse(req.url.split('?')[1])
}


module.exports = {
  getPostData,
  getQueryData,
}