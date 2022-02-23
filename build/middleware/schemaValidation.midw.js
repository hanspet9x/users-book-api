"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MValidateQueryRequest = void 0;
var ResponseError_1 = __importDefault(require("../services/response/ResponseError"));
var ResponseService_1 = require("../services/response/ResponseService");
var MValidateQueryRequest = function (schema) { return function (req, res, next) {
    var error = schema.validate(req.query).error;
    if (error) {
        ResponseService_1.ResponseService.sendError(res, new ResponseError_1.default(error.details[0].message, 400));
        return;
    }
    req.body = req.query;
    next();
    return;
}; };
exports.MValidateQueryRequest = MValidateQueryRequest;
