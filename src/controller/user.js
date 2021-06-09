const { exec } = require('../db/mysql.js')

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

module.exports = {
  login
}