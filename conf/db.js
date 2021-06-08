const env = process.env.NODE_ENV //环境变量

let MYSQL_CONF;
// 根据不同环境配置不同的mysql配置
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: "root",
    password: 'admin123',
    port: 3306,
    database: 'myblog'
  }
}
if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: "root",
    password: 'admin123',
    port: 3306,
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}