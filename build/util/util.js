"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomizeArray = void 0;
var randomizeArray = function (array) {
    var length = array.length;
    var temp;
    var random;
    while (--length > 0) {
        random = Math.floor(Math.random() * length + 1);
        temp = array[random];
        array[random] = array[length];
        array[length] = temp;
    }
    return array;
};
exports.randomizeArray = randomizeArray;
