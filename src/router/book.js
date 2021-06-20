// 匹配路由，调用controller层的方法，获取数据后输出
const Routes = require('../utils/routes.js')
const { getTopBookList, getMenuList, getBookContent, searchBook } = require('../controller/book.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { loginCheck, resCheck } = require('../utils/authCheck.js')
// 小说列表
Routes.get('/api/book/list', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const data = await getTopBookList()
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})
Routes.get('/api/book/search', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { query } = req.query
  const data = await searchBook(query)
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})

// 获取小说章节列表
Routes.get('/api/book/chapter', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { bookUrl } = req.query
  const data = await getMenuList(bookUrl)
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})

// 获取每一章的详情
Routes.get('/api/book/detail', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { chapterUrl } = req.query
  const data = await getBookContent(chapterUrl)
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})