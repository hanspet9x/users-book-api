"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
var responseFormat = function (error, data, message) { return ({
    error: error,
    data: data,
    message: message,
    statusText: error ? 'failed' : 'success',
}); };
exports.ResponseService = {
    sendError: function (response, error) {
        response.status(error.status).json(responseFormat(true, null, error.message));
    },
    sendData: function (response, data, status) {
        response.status(status).json(responseFormat(false, data, ''));
    },
    send200: function (response, data) {
        response.status(200).json(responseFormat(false, data, ''));
    },
};
