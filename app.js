var scraperjs = require('scraperjs');
var path = require('path');
var request = require('request');
var fs = require('fs');

const url = 'http://www.xieell.com/';
const filter_prefix = "http://xieell.21huangye.com/uploads/";
const storage_dir = 'storage/image/';

!fs.existsSync(storage_dir) && fs.mkdirSync(storage_dir) && console.log("create path: " + path.resolve(storage_dir));

scraperjs.StaticScraper.create(url)
    .scrape(function($) {
        return $("img").map(function() {
            return $(this).attr('src');
        }).get();
    })
    .then(function(news) {
        news = news.filter(function (v) {
            return v.substr(0,filter_prefix.length) === filter_prefix;
        });
        news.map(function (v) {
            request(v).pipe(fs.createWriteStream(storage_dir + path.basename(v)));
            console.dir(v);
        });
    });
