// 匹配路由，调用controller层的方法，获取数据后输出
const Routes = require('../utils/routes.js')
const { getList, getDetail, newBlog, updateBlog, delBlog, getTypeList, getAllList, addRecomment, getRecomment } = require('../controller/blog.js')
const { successModel, errorModel } = require('../model/resModel.js')
const { loginCheck, resCheck } = require('../utils/authCheck.js')
// 博客列表
Routes.get('/api/blog/list', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { type_id, pageSize, curPage } = req.query
  let data = []
  try {
    data = await getList(type_id, curPage, pageSize)
  } catch (error) {
    console.log(error)
  }
  res.response = new successModel(data, '请求成功')
  //     break;
  // }

  resCheck(res)
})

// 获取博客类型列表
Routes.get('/api/blog/getTypeList', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const data = await getTypeList()
  if (data) {
    res.response = new successModel(data, '获取成功')
  } else {
    res.response = new errorModel(data, '获取失败')
  }
  //     break;
  // }
  resCheck(res)
})

// 获取指定作者的博客
Routes.get('/api/blog/authorList', async (req, res) => {
  switch (Boolean(loginCheck(req))) {
    case true:
      res.response = loginCheck(req)
      break;
    case false:
      const { keywords } = req.query;
      const author = req.session.username
      const data = await getAllList(author, keywords)
      res.response = new successModel(data, '请求成功')
      break;
  }

  resCheck(res)
})
// 博客详情
Routes.get('/api/blog/detail', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:
  const { id } = req.query;
  const data = await getDetail(id)
  res.response = new successModel(data, '请求成功')
  // break;
  // }
  resCheck(res)
})

// 新建博客
Routes.post('/api/blog/new', async (req, res) => {
  switch (Boolean(loginCheck(req))) {
    case true:
      res.response = loginCheck(req)
      break;
    case false:
      // 如果验证通过，将session中的username赋值给body，用来验证身份
      req.body.author = req.session.username
      const data = await newBlog(req.body)
      res.response = new successModel(data, '请求成功')
      break;
  }

  resCheck(res)
})

// 更新博客
Routes.post('/api/blog/update', async (req, res) => {
  switch (Boolean(loginCheck(req))) {
    case true:
      res.response = loginCheck(req)
      break;
    case false:
      const { id } = req.body
      const data = await updateBlog(id, req.body)
      if (data) {
        res.response = new successModel('更新成功')
      } else {
        res.response = new errorModel('更新失败')
      }
      break;
  }
  resCheck(res)
})

// 删除博客
Routes.post('/api/blog/delete', async (req, res) => {
  switch (Boolean(loginCheck(req))) {
    case true:
      res.response = loginCheck(req)
      break;
    case false:
      const { id } = req.body
      // 如果验证通过，将session中的username赋值给body，用来验证身份
      const author = req.session.username
      const data = await delBlog(id, author)
      if (data) {
        res.response = new successModel('删除成功')
      } else {
        res.response = new errorModel('删除失败')
      }
      break;
  }
  resCheck(res)
})




// 新建评论
Routes.post('/api/blog/addRecomment', async (req, res) => {
  switch (Boolean(loginCheck(req))) {
    case true:
      res.response = loginCheck(req)
      break;
    case false:
      // 如果验证通过，将session中的username赋值给body，用来验证身份
      req.body.author = req.session.username
      try {
        const data = await addRecomment(req.body)
        res.response = new successModel(data, '添加成功')
      } catch (error) {
        res.response = new errorModel('添加失败')
      }
      break;
  }
  resCheck(res)
})

// 获取对应博客的所有评论
Routes.get('/api/blog/getRecomment', async (req, res) => {
  // switch (Boolean(loginCheck(req))) {
  //   case true:
  //     res.response = loginCheck(req)
  //     break;
  //   case false:

  try {
    const { blogid } = req.query;
    const data = await getRecomment(blogid)
    res.response = new successModel(data, '请求成功')
  } catch (error) {
    res.response = new errorModel('请求失败')
  }

  //     break;
  // }
  resCheck(res)
})
