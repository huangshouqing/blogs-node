/**
 * 作者： manongwuma
 * 邮箱：manongwuma@163.com
 * 社区网址：https://itperfect.club
 *
 * 说明：crawler 用于网站数据爬取和dom操作，所有页面的dom数据将由这里获取。
 */
const config = require('./config.js');
const request = require('request');
const cheerio = require('cheerio');

/**
 * 爬虫引擎
 * @param {String} url 请求地址
 */
async function http (url) {
  return new Promise((resolve) => {
    request({
      method: "Get",
      url: url,
      headers: config.headers,
    }, (error, response, body) => {
      resolve(body);
    })
  });
}

/**
 * 获取播放列表
 * @param {*} src 
 */
const getPlayList = async (src) => {
  const playList = []
  const html = await http(src)
  $ = cheerio.load(html, { decodeEntities: false });
  // 对电影做特殊处理
  $('.row .2u').each((i, v) => {
    const label = $(v).children('p').text().trim()
    const pc = config.vip_over + $(v).children('a').eq(0).attr('href')
    const mobile = config.vip_over + $(v).children('a').eq(1).attr('href')
    playList.push({
      label,
      pc,
      mobile
    })
  })
  return playList
}





module.exports = {
  http,
  getPlayList,
};