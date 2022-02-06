import puppeteer from 'puppeteer';

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto('https://www.epicgames.com/store/en-US/free-games');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
