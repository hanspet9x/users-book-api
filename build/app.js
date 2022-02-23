"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var server_config_1 = require("./config/server.config");
var AppController_1 = __importDefault(require("./controllers/AppController"));
var App = (0, express_1.default)();
App.use((0, cors_1.default)());
App.use(express_1.default.json());
// create router.
// register router
App.use(server_config_1.ServerConfig.SERVER_PATH, AppController_1.default);
exports.default = App;
