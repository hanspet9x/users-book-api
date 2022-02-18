import { getEnv } from ".";

export const PuppeteerConfig = {
    PAGE_TIMEOUT: Number(getEnv('PAGE_TIMEOUT', '30')),
    PAGE_TIMEOUT_SIGNAL: getEnv('PAGE_TIMEOUT_SIGNAL')
}