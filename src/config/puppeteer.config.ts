import { getEnv } from ".";

export const PuppeteerConfig = {
    PAGE_TIMEOUT: Number(getEnv('PAGE_TIMEOUT', '30'))
}