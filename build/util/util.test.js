"use strict";
var randomizeArray = require("./util").randomizeArray;
var array = ['1', '2', '3', '4', '5', '6', '7'];
describe('App Utils', function () {
    var result;
    beforeAll(function () {
        result = randomizeArray(array);
    });
    test('Has same length', function () {
        expect(result.length).toBe(array.length);
    });
    test('result length is not less than actual', function () {
        var unique = new Set(result);
        expect(unique.size).toBe(array.length);
    });
    test('empty array returns empty', function () {
        expect(randomizeArray([])).toEqual([]);
    });
});
