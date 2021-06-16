const cheerio = require('cheerio')
const superagent = require('superagent')
require('superagent-charset')(superagent)
// const async = require('async');

// 获取top榜booklist
getTopBookList = () => {
  let baseUrl = 'https://www.biquge7.com/top/';
  let bookList = [];
  return new Promise((resolve, rejcet) => {
    superagent.get(baseUrl).buffer(true).charset('UTF-8').end((err, res) => {
      let $ = cheerio.load(res.text);
      $('.blocks li').each((i, v) => {
        let book = {}
        const author = $(v).text().split('/')[1]
        const title = $(v).children('a').text()
        const link = 'http://www.biquge7.com' + $(v).children('a').attr('href')
        book = {
          author,
          title,
          link
        }
        bookList.push(book)
      })
      resolve(bookList)
      return
    })
  })
}
// 搜索功能
searchBook = (query) => {
  let baseUrl = `https://www.biquge7.com/s?q=${encodeURI(query)}`;
  let bookList = [];
  return new Promise((resolve, rejcet) => {
    superagent.get(baseUrl).buffer(true).charset('UTF-8').end((err, res) => {
      let $ = cheerio.load(res.text);
      $('.so_list .bookbox .p10').each((i, v) => {
        let book = {}
        const img = $(v).children('.bookimg').children('a').children('img').attr('src')
        const title = $(v).children('.bookinfo').children('.bookname').children('a').text()
        const link = 'https://www.biquge7.com' + $(v).children('.bookinfo').children('.bookname').children('a').attr('href')
        const cat = $(v).children('.bookinfo').children('.cat').text()
        const author = $(v).children('.bookinfo').children('.author').text()
        const uptime = $(v).children('.bookinfo').children('.uptime').text()
        const des = $(v).children('.bookinfo').children('p').text()
        book = {
          img,
          title,
          link,
          cat,
          author,
          uptime,
          des
        }
        bookList.push(book)
      })
      return resolve(bookList)
    })
  })
}

// 获取目录列表
getMenuList = (bookUrl = 'https://www.biquge7.com/book/1472/') => {
  let menuList = []
  return new Promise((resolve, rejcet) => {
    superagent.get(bookUrl).buffer(true).charset('UTF-8').end((err, res) => {
      let $;
      try {
        $ = cheerio.load(res.text);
      } catch (error) {
        return
      }
      // 读取章节列表页面
      $('.listmain dd a').each((i, v) => {
        const link = 'https://www.biquge7.com' + $(v).attr('href')
        const title = $(v).text() + '.txt';
        menuList.push({
          link,
          title
        })
      })
      return resolve(menuList)
    })
  })
}

// 获取每一章的内容
getBookContent = (url, callback, id = 0) => {
  let obj = {};
  return new Promise((resolve, rejcet) => {
    superagent.get(url)
      .buffer(true)
      .charset('UTF-8')
      .end(function (err, res) {
        try {
          let $ = cheerio.load(res.text);
          let content = reconvert($(".book .content #content").html())
          // let content = $(".book .content #content").html()
          obj = {
            id: id,
            err: 0,
            title: '\n' + $('.book .content h1').text(), //标题
            content: '\n' + trim(content.toString()), //内容
            prev: 'https://www.biquge7.com' + $($(".book .content .page_chapter a").get(0)).attr('href'),
            next: 'https://www.biquge7.com' + $($(".book .content .page_chapter a").get(2)).attr('href')
            // content: '\n' + content //内容
          }
        } catch (error) {
          obj = {
            id: id,
            err: -1,
            title: '\n' + '获取失败', //标题
            content: '\n' + '获取失败',//内容
            next: '',
            prev: ''
          }
        }
        // callback(null, obj)
        return resolve(obj)
      })
  })

}

// 获取一部小说所有的内容
getAllContent = () => {
  let Book = []
  let id = 0;
  //获取每个章节列表
  async.mapLimit(urls, urls.length, (url, callback) => {
    id++
    getBookContent(url, callback, id);
  }, (err, results) => {
    // // //将文件写入本地
    for (var i = 0; i < results.length - 1; i++) {
      Book.push(results[i])
    }
  })
}



reconvert = (str) => {
  str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
  });
  return str
}
trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '').replace(/ /g, '')
}

module.exports = {
  getTopBookList,
  getMenuList,
  getBookContent,
  searchBook
}
