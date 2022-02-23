"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerConfig = void 0;
var _1 = require(".");
exports.PuppeteerConfig = {
    PAGE_TIMEOUT: Number((0, _1.getEnv)('PAGE_TIMEOUT', '30')) * 1000,
};
