const { exec } = require('../db/mysql.js')

/**
 * 处理数据的模块，处理数据，返回数据
 * @param {作者} author 
 * @param {关键词} keyword 
 * @returns 
 */
const getList = (author, keyword) => {
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
  const { title, content, author } = blogData
  const createtime = Date.now()
  // 新建blog语句
  const sql = `insert into blogs (title,content,author,createtime) values ('${title}','${content}','${author}','${createtime}')`
  return exec(sql).then(insertData => {
    console.log('insertData', insertData)
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
  const { title, content } = blogData
  const createtime = Date.now()
  // 更新blog语句
  const sql = `update blogs set title='${title}', content='${content}' where id = ${id}`
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
 * @returns 
 */
const delBlog = (id,author) => {
  // 假删除blog语句
  const sql = `update blogs set state='0' where id = ${id} and author = '${author}'`
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    } else {
      return false
    }

  })
}



module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}