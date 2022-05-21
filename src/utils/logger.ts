import chalk from 'chalk';

let counter = 1;
export const allMsgs: string[] = [];
const getMsg = (msg: string) => chalk.whiteBright(`${msg.toUpperCase()}\n`);

export const logProcess = (msg: string) => {
  console.log(`${chalk.black.bgBlue(` ${counter}. PROCESS `)} ${getMsg(msg)}`);
  allMsgs.push(` ${counter}. PROCESS: ${msg}`);
  counter++;
};

export const logSuccess = (msg: string) => {
  console.log(`${chalk.black.bgGreen(` ${counter}. SUCCESS `)} ${getMsg(msg)}`);
  allMsgs.push(` ${counter}. SUCCESS: ${msg}`);
  counter++;
};

export const logError = (msg: string) => {
  console.log(`${chalk.black.bgRed(` ${counter}. ERROR `)} ${getMsg(msg)}`);
  allMsgs.push(` ${counter}. ERROR: ${msg}`);
  counter++;
};
