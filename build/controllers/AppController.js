"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var BookController_1 = __importDefault(require("./book/BookController"));
var AppController = express_1.default.Router();
AppController.use('/books', BookController_1.default);
exports.default = AppController;
