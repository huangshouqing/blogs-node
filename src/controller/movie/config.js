/**
 * 作者： manongwuma
 * 邮箱：manongwuma@163.com
 * 社区网址：https://itperfect.club
 *
 * 说明：config 网站所有公共配置文件。
 */
module.exports = {
  // 网站名称
  title: 'crawler-cms系统',

  // 模板文件
  template: 'default',

  // VIP解析接口
  // vip_over: 'https://660e.com?url=',
  // vip_over: 'https://17kyun.com/api.php?url=',
  // vip_over: 'https://jx.yunboys.cn/?url=',
  // vip_over: 'https://www.cuan.la/m3u8.php?url=',

  // 服务器地址
  server: '',

  // 服务端口
  port: 80,

  // 爬虫请求头配置
  headers: {
    'User-Agent': 'Mozilla/ 5.0(Macintosh; Intel Mac OS X 10_15_2) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 79.0.3945.88 Safari / 537.36',
  }
};