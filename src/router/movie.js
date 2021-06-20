// 匹配路由，调用controller层的方法，获取数据后输出
const Routes = require('../utils/routes.js')
const crawler = require('../controller/movie/crawler.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { loginCheck, resCheck } = require('../utils/authCheck.js')

Routes.get('/api/movie/search', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { keyword } = req.query;
  const html = await crawler.http(`https://so.360kan.com/index.php?from=so_result&du=100&fr=100&pb=100&cat=0&st=100&pageno=1&kw=${encodeURI(keyword)}`)
  const data = await crawler.search(html)
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})

Routes.get('/api/movie/detail', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { movieSrc, type } = req.query;
  const data = await crawler.getPlayList(movieSrc, type)
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})
