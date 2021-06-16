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



/**
 * 首页排行榜数据
 * @param {String} html 网页字符串
 */
async function bangdan (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });
    const data = [];
    $('.content-right .p-mod').each((index, el) => {
      // 榜单标题
      const title = $(el).find('.p-mod-title span').html();

      // 榜单列表
      const list = [];
      $(el).find('.rank-list .rank-item').each((key, es) => {
        list.push({
          name: $(es).find('a').attr('title'),
          src: $(es).find('a').attr('href'),
        });
      });
      data.push({
        title,
        list
      });
    });
    resolve(data);
  });
}
/**
 * 首页排行榜数据
 * @param {String} html 网页字符串
 */
async function bangdan (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });
    const data = [];
    $('.content-right .p-mod').each((index, el) => {
      // 榜单标题
      const title = $(el).find('.p-mod-title span').html();

      // 榜单列表
      const list = [];
      $(el).find('.rank-list .rank-item').each((key, es) => {
        list.push({
          name: $(es).find('a').attr('title'),
          src: $(es).find('a').attr('href'),
        });
      });
      data.push({
        title,
        list
      });
    });
    resolve(data);
  });
}

/**
 * 首页获取轮播图
 * @param {String} html 网页
 */
async function swipers (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });
    const data = [];
    $('.group-wrap a').each((index, el) => {
      data.push({
        src: $(el).attr('href'),
        img: $(el).find('img').attr('src'),
        name: $(el).find('span.title').html(),
        desc: $(el).find('span.desc').html(),
      });
    });
    resolve(data);
  });
}

/**
 * 首页电视剧推荐
 * @param {String} html 网页
 */
async function dianshi (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });

    // 标题
    const title = $('#js-dianshi').find('span.p-mod-label').html();

    // 栏目分类： 军事 科幻 言情 等等
    const type = [];
    $('#js-dianshi').find('a.p-mod-desc').each((index, el) => {
      type.push({
        name: $(el).html(),
        src: $(el).attr('href'),
      });
    });

    // 视频列表
    const list = [];
    $('#js-dianshi').find('ul.list li').each((index, el) => {
      list.push({
        name: $(el).attr('title'),
        src: $(el).find('a').attr('href'),
        img: $(el).find('img').attr('src'),
        desc: $(el).find('p.w-newfigure-desc').html(),
        hot: $(el).find('span.w-newfigure-hint').html(),
      });
    });

    resolve({
      title: title,
      more: {
        name: $('#js-dianshi').find('a.p-mod-more').html(),
        src: $('#js-dianshi').find('a.p-mod-more').attr('href'),
      },
      type,
      list
    });
  });
}

/**
 * 首页综艺推荐
 * @param {String} html 网页
 */
async function zongyi (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });

    // 标题
    const title = $('.zongyi').find('.p-mod-title .p-mod-label').html();

    // 栏目分类
    const type = [];
    $('.zongyi').find('a.p-mod-desc').each((index, el) => {
      type.push({
        name: $(el).html(),
        src: $(el).attr('href'),
      });
    });

    // 视频列表
    const list = [];
    $('.zycontent').find('ul.list li').each((index, el) => {
      list.push({
        name: $(el).attr('title'),
        src: $(el).find('a').attr('href'),
        img: $(el).find('img').attr('src'),
        desc: $(el).find('p.w-newfigure-desc').html(),
        hot: $(el).find('span.w-newfigure-hint').html(),
      });
    });

    resolve({
      title: title,
      more: {
        name: $('.zongyi').find('a.p-mod-more').html(),
        src: $('.zongyi').find('a.p-mod-more').attr('href'),
      },
      type,
      list
    });
  });
}

/**
 * 首页电影推荐
 * @param {String} html 网页
 */
async function dianying (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });

    // 标题
    const title = $('.p-mod.remendy').find('.p-mod-title .p-mod-label').html();

    // 栏目分类
    const type = [];
    $('.p-mod.remendy').find('a.p-mod-desc').each((index, el) => {
      type.push({
        name: $(el).html(),
        src: $(el).attr('href'),
      });
    });

    // 视频列表
    const list = [];
    $('.rmcontent').find('ul.list li').each((index, el) => {
      list.push({
        name: $(el).attr('title'),
        src: $(el).find('a').attr('href'),
        img: $(el).find('img').attr('src'),
        desc: $(el).find('p.w-newfigure-desc').html(),
        score: $(el).find('.title .s2').html(),
      });
    });

    resolve({
      title: title,
      more: {
        name: $('.zongyi').find('a.p-mod-more').html(),
        src: $('.zongyi').find('a.p-mod-more').attr('href'),
      },
      type,
      list
    });
  });
}

/**
 * 首页动漫推荐
 * @param {String} html 网页
 */
async function dongman (html) {
  return new Promise((resolve) => {
    $ = cheerio.load(html, { decodeEntities: false });

    // 标题
    const title = $('.dongman').find('.p-mod-title .p-mod-label').html();

    // 栏目分类
    const type = [];
    $('.dongman').find('a.p-mod-desc').each((index, el) => {
      type.push({
        name: $(el).html(),
        src: $(el).attr('href'),
      });
    });

    // 视频列表
    const list = [];
    $('.dongman ul.list').find('li').each((index, el) => {
      list.push({
        name: $(el).attr('title'),
        src: $(el).find('a').attr('href'),
        img: $(el).find('img').attr('src'),
        desc: $(el).find('p.w-newfigure-desc').html(),
        hot: $(el).find('span.w-newfigure-hint').html(),
      });
    });

    resolve({
      title: title,
      more: {
        name: $('.dongman').find('a.p-mod-more').html(),
        src: $('.dongman').find('a.p-mod-more').attr('href'),
      },
      type,
      list
    });
  });
}

module.exports = {
  http,
  getPlayList,
  search,
  bangdan,
  swipers,
  dianshi,
  zongyi,
  dianying,
  dongman,
};