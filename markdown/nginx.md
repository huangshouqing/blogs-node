# nginx介绍

1. 高性能的web服务器，开源免费

2. 一般用于做静态服务，负载均衡

3. 反向代理（本次使用）

Windows下Nginx的启动、停止等命令
Windows下Nginx的启动、停止等命令
在Windows下使用Nginx，我们需要掌握一些基本的操作命令，比如：启动、停止Nginx服务，重新载入Nginx等，下面我就进行一些简单的介绍。
1、启动：
C:\server\nginx-1.0.2>start nginx或
C:\server\nginx-1.0.2>nginx.exe

2、停止：
C:\server\nginx-1.0.2>nginx.exe -s stop或
C:\server\nginx-1.0.2>nginx.exe -s quit
注：stop是快速停止nginx，可能并不保存相关信息；quit是完整有序的停止nginx，并保存相关信息。

3、重新载入Nginx：
C:\server\nginx-1.0.2>nginx.exe -s reload
当配置信息修改，需要重新载入这些配置时使用此命令。

4、重新打开日志文件：
C:\server\nginx-1.0.2>nginx.exe -s reopen

5、查看Nginx版本：
C:\server\nginx-1.0.2>nginx -v
