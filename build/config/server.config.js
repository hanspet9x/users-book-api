"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerConfig = void 0;
var _1 = require(".");
exports.ServerConfig = {
    SERVER_PORT: (0, _1.getEnv)('SERVER_PORT'),
    SERVER_PATH: (0, _1.getEnv)('SERVER_PATH'),
};
