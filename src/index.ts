import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { logProcess, logSuccess, logError } from './utils/logger';
import login from './actions/login';
import getGame from './actions/getGame';

(async () => {
  const today = new Date();
  if (today.getDay() <= 4) {
    // run only on friday and saturday
    logError('will only run on friday and saturday');
    return;
  }

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
