/**
 * 创建一个执行sql语句的函数，输出给外面使用 
 */
const { MYSQL_CONF } = require('../../conf/db.js')
// 引入mysql
const mysql = require('mysql');
// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)
// 创建连接
con.connect()

// sql语句
const sql = 'select * from users';

// 统一执行sql语句的函数
function exec (sql) {
  return new Promise((resolve, reject) => {
    // 执行sql语句
    con.query(sql, (err, res) => {
      if (err) {
        return reject(err)
      }
      resolve(res)
    })
  })
}

module.exports = {
  exec
}
