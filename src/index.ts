import puppeteer from 'puppeteer';

import { logProcess, logSuccess, logError } from './utils/logger';
import cookies from './utils/cookies.json';
import getGame from './actions/getGame';

require('dotenv').config();

(async () => {
  const browser = await puppeteer.launch({
    // headless: true,
    headless: false,
    defaultViewport: {
      height: 1080,
      width: 1920,
    },
  });

  const page = await browser.newPage();

  const finalCookies = cookies.map((cookie) => ({
    ...cookie,
    domain: '.epicgames.com',
    url: 'https://www.epicgames.com/',
    path: '/',
    httpOnly: false,
    secure: true,
  }));
  await page.setCookie(...finalCookies);
  await page.goto('https://www.epicgames.com/store/en-US/free-games');

  try {
    await getGame(page);
  } catch (error) {
    logError('error. Check below');
    console.log(error);
  } finally {
    logProcess('closing browser');
    await browser.close();
    logSuccess('successfully closed browser');
  }
})();
