const { exec } = require('../db/mysql.js')
/**
 * @description: 用户登录接口
 * @param {用户名} username
 * @param {密码} password
 * @return {*}
 */
const login = (username, password) => {
  let sql = 'select * from users where 1=1 '
  if (username && password) {
    sql += `and username='${username}' `
    sql += `and password='${password}' `
    return exec(sql).then(rows => {
      return rows[0]
    })
  } else {
    return {}
  }

}

/**
 * @description: 用户注册接口
 * @param {用户名} username
 * @param {密码} password
 * @return {*}
 */
const register = async (username, password, realname) => {
  console.log(username, password, realname)
  checkSql = `select * from users where username = '${username}'`
  const checkRes = await exec(checkSql)
  if (checkRes && checkRes.length > 0) {
    return {
      code: -2,
    }
  }
  let sql = 'insert into users (username,`password`,realname) ' + `values ('${username}','${password}','${realname}')`
  if (username && password && realname) {
    return exec(sql).then(insertData => {
      return {
        code: 0,
      }
    })
  } else {
    return {
      code: -1
    }
  }

}
module.exports = {
  login,
  register
}