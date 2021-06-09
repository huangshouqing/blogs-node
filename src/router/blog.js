// 匹配路由，调用controller层的方法，获取数据后输出
const routeMatching = require('../utils/routeMatching.js')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { successModel, errorModel } = require('../model/resModel.js')
// 统一的登录验证函数
const loginCheck = (req) => {
  const { username } = req.session
  if (!username) {
    return new errorModel('尚未登录')
  }
}
const handleBlogRouter = async (req, res) => {
  const router = new routeMatching(req, res)
  // 博客列表
  await router.get('/api/blog/list', async (req, res) => {
    if (loginCheck(req)) {
      return res.response = loginCheck(req)
    }
    const { keywords } = req.query;
    const author = req.session.username
    const data = await getList(author, keywords)
    res.response = new successModel(data, '请求成功')
  })

  // 博客详情
  await router.get('/api/blog/detail', async (req, res) => {
    if (loginCheck(req)) {
      return res.response = loginCheck(req)
    }
    const { id } = req.query;
    const data = await getDetail(id)
    res.response = new successModel(data, '请求成功')
  })

  // 新建博客
  await router.post('/api/blog/new', async (req, res) => {
    if (loginCheck(req)) {
      return res.response = loginCheck(req)
    }
    // 如果验证通过，将session中的username赋值给body，用来验证身份
    req.body.author = req.session.username
    const data = await newBlog(req.body)
    res.response = new successModel(data, '请求成功')
  })

  // 更新博客
  await router.post('/api/blog/update', async (req, res) => {
    if (loginCheck(req)) {
      return res.response = loginCheck(req)
    }
    const { id } = req.body
    const data = await updateBlog(id, req.body)
    if (data) {
      res.response = new successModel('更新成功')
    } else {
      res.response = new errorModel('更新失败')
    }
  })

  // 删除博客
  await router.post('/api/blog/delete', async (req, res) => {
    if (loginCheck(req)) {
      return res.response = loginCheck(req)
    }
    const { id } = req.body
    // 如果验证通过，将session中的username赋值给body，用来验证身份
    const author = req.session.username
    const data = await delBlog(id, author)
    if (data) {
      res.response = new successModel('删除成功')
    } else {
      res.response = new errorModel('删除失败')
    }
  })

}
module.exports = handleBlogRouter