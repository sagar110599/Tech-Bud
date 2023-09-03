const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const Twit = require('twit');


router.get('/twitter', function (req, res) {
    const query = req.query.query;

    var T = new Twit({
        consumer_key: '8txieBV3SIv4F9bcjlB1R6p3M',
        consumer_secret: 'NakVyQOdl9CWIvkCbZU9WBmV33WsG3JpH0M4cZOdFsWKPW6kOF',
        access_token: '1353767429625798656-7NrHl542B3drRjCwXyOfgfDm1aiDMR',
        access_token_secret: '10Il2HYJFNLn2slSx9S9y4s4XpPQ94MNQ7nuOMYiERUzo',
    })
    T.get('search/tweets', { q: query, count: 5, lang: 'en', result_type: 'mixed' }, function (err, data, response) {
        tweets = data.statuses.map(x => {
            review = {
                'name': x.user.name,
                'username': x.user.screen_name,
                'profile_pic': x.user.profile_image_url,
                'tweet': x.text
            };
            return review;
        })
        console.log(tweets);
        res.send(tweets);
    })
});

router.get('/amazon', function (req, res) {
    // res.send('Amazon API');
    const domain = "https://www.amazon.in";
    const query = req.query.query;
    (async () => {
        // wrapper to catch errors
        try {
            // create a new browser instance
            const browser = await puppeteer.launch({ args: ['--no-sandbox'] }, { headless: true });

            // create a page inside the browser;
            const page = await browser.newPage();

            // navigate to a website and set the viewport
            await page.setViewport({ width: 1280, height: 720 });
            await page.goto(domain, {
                timeout: 3000000
            });

            const product = "iphone x 64gb";
            // search and wait the product list
            await page.type('#twotabsearchtextbox', query);
            await page.click('#nav-search-submit-button');
            await page.waitForSelector('.s-image');


            const products = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('.s-result-item'));
                console.log("Links");
                console.log(links);
                return links.map(link => {
                    if (link.querySelector(".a-price-whole")) {
                        return {
                            name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
                            url: link.querySelector(".a-link-normal.a-text-normal").href,
                            image: link.querySelector(".s-image").src,
                            price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.₹]/g, '')),
                            site: 'Amazon'
                        };
                    }
                }).slice(0, 5).filter(i => i);
            });
            console.log(products);
            await browser.close();
            res.send(products);
        } catch (error) {
            // display errors
            console.log(error)
        }
    })();
});

router.get('/flipkart', function (req, res) {
    const query = req.query.query;
    console.log("flipkart");
    (async () => {
        try {
            // create a new browser instance
            const browser = await puppeteer.launch({ args: ['--no-sandbox'] }, { headless: true });

            // create a page inside the browser;
            const page = await browser.newPage();

            // navigate to a website and set the viewport
            await page.setViewport({ width: 1280, height: 720 });

            const product = query;
            await page.goto('https://www.flipkart.com/search?q=' + product, {
                timeout: 3000000
            });

            await page.waitForSelector("._396cs4._3exPp9");

            const products = await page.evaluate(() => {
                const links = Array.from(document.querySelectorAll('._2kHMtA'));
                console.log("Links");
                return links.map(link => {
                    console.log(link);
                    if (link.querySelector("._396cs4._3exPp9") && link.querySelector("._30jeq3._1_WHN1")) {
                        return {
                            name: link.querySelector("._4rR01T").textContent,
                            url: link.querySelector("._1fQZEK").href,
                            image: link.querySelector("._396cs4._3exPp9").src,
                            price: parseFloat(link.querySelector("._30jeq3._1_WHN1").textContent.replace(/[,.₹]/g, '')),
                            site: 'Flipkart'
                        };
                    }
                }).slice(0, 5).filter(i => i);
            });
            console.log(products);
            res.send(products);

            await browser.close();
        } catch (error) {
            console.log(error);
        }
    })();
});

module.exports = router;
