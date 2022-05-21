import fs from 'fs';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import { LAUNCH_OPTIONS } from './utils/constants';
import { logProcess, logSuccess, logError, allMsgs } from './utils/logger';
import login from './actions/login';
import getGame from './actions/getGame';
import getGameUrls from './actions/getGameUrls';

(async () => {
  const today = new Date();
  if (today.getDay() <= 4) {
    // run only on friday and saturday
    logError('will only run on friday and saturday');
    return;
  }

  puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch(LAUNCH_OPTIONS);
  const page = await browser.newPage();
  await page.goto('https://www.epicgames.com/store/en-US/free-games');

  try {
    await login(page);
    const gameUrls = await getGameUrls(page);
    for (const gameUrl of gameUrls) {
      await getGame(page, gameUrl);
    }
  } catch (error) {
    const finalError = error as Error;

    logError('error. Check below');
    console.log(finalError);
    allMsgs.push(finalError.message);
    allMsgs.push(finalError.stack as string);
  } finally {
    logProcess('closing browser');
    await browser.close();
    logSuccess('successfully closed browser');

    fs.writeFile('result.log', allMsgs.join('\n'), (error) => {
      if (error) throw error;
    });
  }
})();
