import {getEnv} from '.';

export const PuppeteerConfig = {
  PAGE_TIMEOUT: Number(getEnv('PAGE_TIMEOUT', '30')) * 1000,
  PAGE_TIMEOUT_RETRY_MULTIPLE: 2,
};
