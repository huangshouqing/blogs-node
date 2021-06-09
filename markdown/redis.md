# redis
webserver 最常用的缓存数据库，数据存放在内存中
相比于mysql，访问速度快（内存和硬盘不是一个数量级的）

将webserver和redis拆分为两个单独的服务
双方都是独立的，都是可扩展的


# 为什么session适合用redis？
session 访问频繁，对性能要求极高
session可以不考虑断电丢失数据的问题（内存的硬伤）
session数据量不会很大（相比于mysql中存储的数据）

# 为什么网站数据不适合使用redis？
操作频率不是很高（相比于session操作）
断电必须丢失，必须保存
数据量太大，内存成本太高

# 安装redis