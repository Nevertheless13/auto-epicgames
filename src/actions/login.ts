import puppeteer from 'puppeteer';
import { logProcess, logSuccess, logError } from '../utils/logger';

require('dotenv').config();

export const waitForOptions = {
  visible: true,
};

const elements = {
  signInLink: 'li[data-component="SignIn"]',
  loginWithEpicBtn: 'div#login-with-epic',
  email: 'input#email',
  pass: 'input#password',
  signInBtn: 'button#sign-in',
  signedInUser: 'span.display-name',
};

const login = async (page: puppeteer.Page) => {
  logProcess('clicking sign in link');
  await page.waitForSelector(elements.signInLink, waitForOptions);
  await page.click(elements.signInLink);

  logProcess('clicking sign in with epic games');
  await page.waitForSelector(elements.loginWithEpicBtn, waitForOptions);
  await page.click(elements.loginWithEpicBtn);

  logProcess('setting credentials');
  await page.waitForSelector(elements.email);
  await page.type(elements.email, process.env.EMAIL as string);
  await page.waitForSelector(elements.pass);
  await page.type(elements.pass, process.env.PASSWORD as string);

  logProcess('waiting for log in now button');
  await page.waitForFunction(
    `document.querySelector("${elements.signInBtn} span span").innerText.toLowerCase() == "log in now" `
  );

  logProcess('logging in');
  await page.click(elements.signInBtn);
  await page.waitForSelector(elements.signedInUser);
  logSuccess('successfully signed in');
};

export default login;
