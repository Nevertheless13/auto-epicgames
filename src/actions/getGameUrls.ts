import puppeteer from 'puppeteer';
import { BASE_URL, WAITFOR_OPTIONS } from '../utils/constants';
import { logProcess, logSuccess } from '../utils/logger';

const getGameUrls = async (page: puppeteer.Page) => {
  const linkElems =
    'a[role="link"] [data-component="StatusBar"] span[data-component="Message"]';
  const baseUrl = BASE_URL;

  logProcess('getting free games urls');
  await page.waitForSelector(linkElems, WAITFOR_OPTIONS);
  const allLinks = await page.$$(linkElems);

  const tempLinks = [];
  for (const element of allLinks) {
    const textOfLink = await element.evaluate((elem) => {
      if (elem.textContent?.toLowerCase() === 'free now') {
        return elem?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.getAttribute(
          'href'
        );
      }

      return null;
    });
    tempLinks.push(textOfLink);
  }

  const freeGamesSelector = tempLinks
    .filter((link) => link)
    .map((link) => `${baseUrl}/${link}`);

  logSuccess('got game urls');

  return freeGamesSelector;
};

export default getGameUrls;
