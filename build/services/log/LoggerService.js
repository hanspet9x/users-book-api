"use strict";
var LoggerService = {
    info: function (error) {
        console.info(error.message);
    },
    error: function (error, severity) {
        console.error(error.message, severity);
    },
};
