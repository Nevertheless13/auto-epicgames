import puppeteer from 'puppeteer-extra';

import { logProcess, logSuccess, logError } from './utils/logger';
import login from './actions/login';
import getGame from './actions/getGame';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

(async () => {
  puppeteer.use(StealthPlugin());

  const browser = await puppeteer.launch({
    headless: !true,
    defaultViewport: {
      height: 1080,
      width: 1920,
    },
  });

  const page = await browser.newPage();
  await page.goto('https://www.epicgames.com/store/en-US/free-games');

  try {
    await login(page);
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
