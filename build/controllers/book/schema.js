"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRequests = void 0;
var joi_1 = __importDefault(require("joi"));
exports.BookRequests = {
    getCartURL: joi_1.default.object({
        genreUrl: joi_1.default.string().uri().required(),
    }),
    getCartURLRetry: joi_1.default.object({
        genreUrl: joi_1.default.link().required(),
        retry: joi_1.default.number().required(),
    }),
    genreRetry: joi_1.default.object({
        retry: joi_1.default.number().required(),
    }),
};
