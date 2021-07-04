const { exec } = require('../db/mysql.js')

/**
 * 处理数据的模块，处理数据，返回数据
 * @param {作者} author 
 * @param {关键词} keyword 
 * @returns 
 */
const getList = async (type_id, curPage, pageSize) => {
  // const typeList = await exec('select type_id from blogs group by type_id')
  // let sql = ''
  // typeList.forEach((item, index) => {
  //   if (index < typeList.length - 1) {
  //     sql += `select * from blogs where state=1 and type_id=${item.type_id} UNION `
  //   } else {
  //     sql += `select * from blogs where state=1 and type_id=${item.type_id} `
  //   }
  // })
  // sql += `order by createtime desc`

  let sql = ''
  sql += `select * from blogs where state=1 and type_id=${type_id} `
  if (curPage === 1) {
    sql += `order by createtime desc limit 0,${pageSize}`
  } else {
    sql += `order by createtime desc limit ${(curPage - 1) * pageSize},${curPage * pageSize}`
  }
  let sql2 = `SELECT *,COUNT(1) from blogs where state=1 and type_id=${type_id}`
  let list = []
  let total = 0
  try {
    list = await exec(sql)
    total = (await exec(sql2))[0]['COUNT(1)']
  } catch (error) {
    console.log(error)
  }
  return {
    list,
    total
  }
}

/**
 * 
 * @param {*} author 
 * @param {*} keyword 
 * @returns 
 */
const getAllList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1 and state=1 '
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += 'order by createtime desc'
  return exec(sql)
}


/**
 * 输出blog的详情
 * @param {blog的id} id 
 * @returns 
 */
const getDetail = (id) => {
  // 查询详情sql语句
  let sql = `select * from blogs where id=${id} `
  return exec(sql).then(rows => {
    return rows[0]
  })
}

/**
 * 
 * @param {是一个博客对象，包含title content属性,包含title，content，author} blogData
 * @returns 
 */
const newBlog = (blogData = {}) => {
  const { title, content, author, type } = blogData
  const createtime = Date.now()
  // 新建blog语句
  const sql = `insert into blogs (title,content,author,createtime,type_id) values ('${title}','${content}','${author}','${createtime}','${type}')`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId,
    }
  })
}

/**
 * 
 * @param {博客id} id 
 * @param {是一个博客对象，包含title content属性} blogData 
 */
const updateBlog = (id, blogData = {}) => {
  let { title, content } = blogData
  content = content.replace(/\'/g, '"')
  const createtime = Date.now()
  // 更新blog语句
  const sql = `update blogs set title='${title}', content='${content}', createtime='${createtime}' where id = ${id}`
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    } else {
      return false
    }

  })
}

/**
 * 
 * @param {博客id} id 
 * @param {博客的作者} author 
 * @returns 
 */
const delBlog = (id, author) => {
  // 假删除blog语句
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    } else {
      return false
    }

  })
}
/**
 * 
 * @returns 获取博客类型接口
 */
const getTypeList = () => {
  // blog语句
  const sql = `select * from type`;
  return exec(sql)
}

/**
 * 
 * @param {博客id} blogid 
 * @param {评论的内容} content 
 * @param {评论由谁写的} author 
 */
const addRecomment = (recomment = {}) => {
  const { blogid, content, author } = recomment
  const createtime = Date.now()
  // 新建blog语句
  const sql = `insert into remark (blogid,content,author,createtime) values ('${blogid}','${content}','${author}','${createtime}')`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId,
    }
  })
}
/**
 * 
 * @param {博客id} blogid 
 * @returns 
 */
const getRecomment = (blogid) => {
  // 查询详情sql语句
  let sql = `select * from remark where blogid=${blogid} `
  return exec(sql)
}


module.exports = {
  getList,
  getAllList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
  getTypeList,
  addRecomment,
  getRecomment
}