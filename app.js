var scraperjs = require('scraperjs');
var path = require('path');
var request = require('request');
var fs = require('fs');

const url = 'http://www.xieell.com/';
const filter_prefix = "http://xieell.21huangye.com/uploads/";
const storage_dir = 'storage/image/';

// 如果不存在则创建目录
//noinspection JSUnresolvedFunction
!fs.existsSync(storage_dir) && fs.mkdirSync(storage_dir) && console.log("create path: " + path.resolve(storage_dir));

// 可以使用静态获取，也可以使用phantomjs来做动态获取，但是很明显phantomjs太慢了。
scraperjs.StaticScraper.create(url)
    .scrape(function($) {
        // 使用jquery来采集
        return $("img").map(function() {
            //noinspection JSUnresolvedFunction
            return $(this).attr('src');
        }).get();
    })
    .then(function(news) {
        // 得到数据后做后续操作
        news = news.filter(function (v) {
            return v.substr(0,filter_prefix.length) === filter_prefix;
        });
        news.map(function (v) {
            request(v).pipe(fs.createWriteStream(storage_dir + path.basename(v)));
            console.dir(v);
        });
    });
