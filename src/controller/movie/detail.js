/**
 * 作者： manongwuma
 * 邮箱：manongwuma@163.com
 * 社区网址：https://itperfect.club
 *
 * 说明：detail 用于详情内容获取。
 */
const config = require('./config.js');
const request = require('request');
const cheerio = require('cheerio');

/**
 * 爬虫引擎
 * @param {String} url 请求地址
 */
async function http(url) {
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
 * 获取视频信息
 * @param {String} html 网页字符串
 */
async function movie(html) {
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
 * 获取视频推荐
 * @param {String} html 网页
 */
async function tuijian(html) {
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

module.exports = {
    movie,
    tuijian,
};