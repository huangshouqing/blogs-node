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
const getPlayList = async (src, type) => {
  const playList = []
  const html = await http(src)
  $ = cheerio.load(html, { decodeEntities: false });
  if (type === 'dianying') {
    // 对电影做特殊处理
    $('#js-siteact .top-list-btns .btn-play').each((i, v) => {
      const label = $(v).text().trim()
      const value = config.vip_over + $(v).attr('href')
      playList.push({
        label,
        value
      })
    })
  } else {
    if ($('#js-siteact #js-site-wrap .num-tab-main').length > 0) {
      $('#js-siteact #js-site-wrap .num-tab-main').last().children('a').each((i, v) => {
        const label = $(v).text().trim()
        const value = config.vip_over + $(v).attr('href')
        playList.push({
          label,
          value
        })
      })
    } else if ($('#js-siteact #js-site-wrap .m-series-number-container').length > 0) {
      $('#js-siteact #js-site-wrap .m-series-content a').each((i, v) => {
        const label = $(v).text().trim()
        const value = config.vip_over + $(v).attr('href')
        playList.push({
          label,
          value
        })
      })
    } else if ($('.js-juji-content .juji-main .w-newfigure').length > 0) {
      $('.js-juji-content .juji-main .w-newfigure .js-link').each((i, v) => {
        const label = $(v).text().trim()
        const value = config.vip_over + $(v).attr('href')
        playList.push({
          label,
          value
        })
      })
    }
  }

  let filterPlayList = [];
  playList.forEach(item => {
    let status = true; // 开关
    if (filterPlayList.length) {
      filterPlayList.forEach(res => {
        if (item.label === res.label) {
          status = false;
        }
      })
    }
    if (status) {
      filterPlayList.push(item)
    }
  })
  return filterPlayList
}

/**
 * 影视搜索
 * @param {String} html 网页字符串
 */
function search (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });
    const data = [];
    getData = (el, data) => {
      let type = '';
      const typeStr = $(el).find('.cont').children('ul').attr('class')

      if (typeStr.indexOf('zongyi') > -1) {
        type = 'zongyi'
      } else if (typeStr.indexOf('dianying') > -1) {
        type = 'dianying'
      } else if (typeStr.indexOf('dongman') > -1) {
        type = 'dongman'
      } else if (typeStr.indexOf('dianshi') > -1) {
        type = 'dianshi'
      }
      // 图片
      const img = $(el).find('.m-mainpic a img').attr('src')
      // 名称
      const title = $(el).find('.cont .title a').text();
      // 描述
      const des = $(el).find('.cont .m-description p').text()
      // 资源地址
      const link = $(el).find('.cont .title a').attr('href')
      // 播放地址
      const playUrl = $(el).find('.cont .button-container .btn-play').attr('href')

      data.push({
        type,
        title,
        img,
        des,
        link,
        playUrl,
      });
    }
    $('#js-longvideo').children('div[class^=js-]').each((index, el) => {
      getData(el, data)
    })
    $('#js-longvideo #js-longvideo-container').children().each((index, el) => {
      getData(el, data)
    });
    resolve(data);
  });
}



module.exports = {
  http,
  getPlayList,
  search,
};