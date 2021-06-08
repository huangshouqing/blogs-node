const { exec } = require('../db/mysql.js')

const login = (username, password) => {
  let sql = 'select * from users where 1=1 '
  if (username) {
    sql += `and username='${username}' `
  }
  if (password) {
    sql += `and password='${password}' `
  }
  return exec(sql).then(rows => {
    return rows[0]
  })
}

module.exports = {
  login
}