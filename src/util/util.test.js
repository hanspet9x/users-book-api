const { randomizeArray } = require("./util");

const array = ['1', '2', '3', '4', '5', '6', '7'];

describe('App Utils', () => {
    let result;
    beforeAll(() => {
        result = randomizeArray(array);
    });

    test('Has same length', () => {
        expect(result.length).toBe(array.length);
    });

    test('result length is not less than actual', () => {
        const unique = new Set(result);
        expect(unique.size).toBe(array.length);
    });

    test('empty array returns empty', () => {
        expect(randomizeArray([])).toEqual([]);
    })
})