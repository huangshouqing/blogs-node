# sql操作语句
``` sql
-- use myblog;
-- show tables;
-- 增
-- insert into users (username,`password`,realname) values ('zhangsan','124','张三')
-- 查询
-- select * from users;
-- 查询部分字段
-- select id,username from users;
-- 条件查询（且）
-- select id,username from users where username = 'zhangsan' and `password` ='123';
-- 条件查询（或）
-- select id,username from users where username = 'zhangsan' or `password` ='123'; 
-- 模糊查询
-- select id,username from users where username like '%zhang%'; 
-- 排序(正序和倒序）
-- select * from users order by id desc 
-- 更新
-- update users set realname = '李四' where username = 'zhangsan' 
-- SET SQL_SAFE_UPDATES = 0
-- 删除(真删，一般实际应用不会真的删除数据)
-- delete from users where username = 'lisi'
-- 假删(更新state的状态即可)
-- update users set state = 0 where username = 'zhangsan'
```

# nodejs操作mysql

``` js
// 引入mysql
const mysql = require('mysql');
// 创建连接对象
const connect = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: 'admin123',
    port: 3306,
    database: 'myblog'
})
// 创建连接
connect.connect()
// sql语句
const sql = 'select * from users';
// 执行sql语句
connect.query(sql, (err, res) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(res)
})
// 关闭连接
connect.end()
```
