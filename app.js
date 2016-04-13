var scraperjs = require('scraperjs');
scraperjs.DynamicScraper.create('http://www.woshipm.com/')
    .scrape(function($) {
        return $(".list-h3 a").map(function() {
            return $(this).text();
        }).get();
    })
    .then(function(news) {
        console.log(news);
    }, function (err) {
        console.log(err);
    });