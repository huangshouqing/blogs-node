// 匹配路由，调用controller层的方法，获取数据后输出
const routeMatching = require('../utils/routeMatching.js')
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog.js')
const { successModel, errorModel } = require('../model/resModel.js')
const handleBlogRouter = async (req, res) => {
  const router = new routeMatching(req, res)
  let response = {}
  // 博客列表
  await router.get('/api/blog/list', async (req, res) => {
    const { author, keywords } = req.query;
    const data = await getList(author, keywords)
    response = new successModel(data, '请求成功')
  })
  // 博客详情
  await router.get('/api/blog/detail', async (req, res) => {
    const { id } = req.query;
    const data = await getDetail(id)
    response = new successModel(data, '请求成功')
  })
  // 新建博客
  await router.post('/api/blog/new', async (req, res) => {
    const data = await newBlog(req.body)
    response = new successModel(data, '请求成功')
  })
  // 更新博客
  await router.post('/api/blog/update', async (req, res) => {
    const { id } = req.query
    const data = await updateBlog(id, req.body)
    if (data) {
      response = new successModel('更新成功')
    } else {
      response = new errorModel('更新失败')
    }
  })
  // 删除博客
  await router.post('/api/blog/delete', async (req, res) => {
    const { id } = req.query
    const data = await delBlog(id)
    if (data) {
      response = new successModel('删除成功')
    } else {
      response = new errorModel('删除失败')
    }
  })

  return response

}
module.exports = handleBlogRouter