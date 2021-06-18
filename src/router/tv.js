// 匹配路由，调用controller层的方法，获取数据后输出
const Routes = require('../utils/routes.js')
const crawler = require('../controller/tv/crawler.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { loginCheck, resCheck } = require('../utils/authCheck.js')

Routes.get('/api/tv/tvList', async (req, res) => {
  switch (Boolean(loginCheck(req))) {
    case true:
      res.response = loginCheck(req)
      break;
    case false:
      const data = await crawler.getPlayList('http://ivi.bupt.edu.cn/')
      res.response = new successModel(data, '请求成功')
      break;
  }

  resCheck(res)
})
