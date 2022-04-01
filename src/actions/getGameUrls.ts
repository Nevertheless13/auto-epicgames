import puppeteer from 'puppeteer';
import { BASE_URL, WAITFOR_OPTIONS } from '../utils/constants';
import { logProcess, logSuccess } from '../utils/logger';

const getGameUrls = async (page: puppeteer.Page) => {
  const linkElems = 'a[aria-label*="Free Now"]';
  const baseUrl = BASE_URL;

  logProcess('getting free games urls');
  await page.waitForSelector(linkElems, WAITFOR_OPTIONS);
  const freeGamesSelector = await page.$$eval(
    linkElems,
    (elements, baseUrl) =>
      elements.map((elem) => {
        const gameUrl = elem.getAttribute('href');
        return `${baseUrl}/${gameUrl}`;
      }),
    baseUrl
  );

  logSuccess('got game urls');

  return freeGamesSelector;
};

export default getGameUrls;
