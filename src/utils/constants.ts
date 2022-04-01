interface LaunchOptions {
  headless: boolean;
  defaultViewport: {
    height: number;
    width: number;
  };
}
interface WaitForOptions {
  visible: boolean;
  hidden?: boolean;
  timeout: number;
}

export const LAUNCH_OPTIONS: LaunchOptions = {
  headless: false,
  defaultViewport: {
    height: 1080,
    width: 1920,
  },
};

export const WAITFOR_OPTIONS: WaitForOptions = {
  visible: true,
  timeout: 120000,
};

export const BASE_URL = 'https://store.epicgames.com';
