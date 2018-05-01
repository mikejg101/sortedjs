/**
 * Created by sophiagames on 4/30/18.
 */
const sorting = require('./sorted.js');

const shuffledNumberArray = [64, 25, 12, 22, 11];
const shuffledObjectArray = [{nest: {id: 64}}, {nest: {id: 25}}, {nest: {id: 12}}, {nest: {id: 22}}, {nest: {id: 11}}];

const sortedAscendingNumberArray = [11, 12, 22, 25, 64];
const sortedAscendingObjectArray = [{nest: {id: 11}}, {nest: {id: 12}}, {nest: {id: 22}}, {nest: {id: 25}}, {nest: {id: 64}}];

const sortedDescendingNumberArray = [64, 25, 22, 12, 11];
const sortedDescendingObjectArray = [{nest: {id: 64}}, {nest: {id: 25}}, {nest: {id: 22}}, {nest: {id: 12}}, {nest: {id: 11}}];

describe('selection', () => {

    describe('given invalid parameters', () => {
        test('a non array as first param throws TypeError', () => {
            expect(() => sorting.selection({}, (a, b) => a - b, sorting.orderBy.ASCENDING))
                .toThrowError(TypeError);
        });
        test('an undefined compare function throws Error', () => {
            expect(() => sorting.selection([]))
                .toThrowError(Error);
        });
        test('an invalid order type throws Error', () => {
            expect(() => sorting.selection([],
                (a, b) => a - b,
                'invalid'))
                .toThrowError(Error);
        });
    });

    describe('given an array of numbers', () => {
        test('ascending sorts correctly', () => {
            const target = shuffledNumberArray;
            const result = sorting.selection(target,
                (a, b) => a - b,
                sorting.orderBy.ASCENDING);
            expect(result).toEqual(sortedAscendingNumberArray);
        });
        test('ascending does not modify the original array', () => {
            const target = shuffledNumberArray;
            const result = sorting.selection(target,
                (a, b) => a - b,
                sorting.orderBy.ASCENDING);
            expect(result).not.toEqual(target);
        });
        test('descending sorts correctly', () => {
            const target = shuffledNumberArray;
            const result = sorting.selection(target,
                (a, b) => a - b,
                sorting.orderBy.DESCENDING);
            expect(result).toEqual(sortedDescendingNumberArray);
        });
        test('descending does not modify the original array', () => {
            const target = shuffledNumberArray;
            const result = sorting.selection(target,
                (a, b) => a - b,
                sorting.orderBy.DESCENDING);
            expect(target).not.toEqual(result);
        });
    });

    describe('given an array of object containing objects', () => {
        test('ascending sorts correctly', () => {
            const target = shuffledObjectArray;
            const result = sorting.selection(target,
                (a, b) => a.nest.id - b.nest.id,
                sorting.orderBy.ASCENDING);
            expect(result).toEqual(sortedAscendingObjectArray);
        });
        test('ascending does not modify the original array', () => {
            const target = shuffledObjectArray;
            const result = sorting.selection(target,
                (a, b) => a.nest.id - b.nest.id,
                sorting.orderBy.ASCENDING);
            expect(result).not.toEqual(target);
        });
        test('descending sorts correctly', () => {
            const target = shuffledObjectArray;
            const result = sorting.selection(target,
                (a, b) => a.nest.id - b.nest.id,
                sorting.orderBy.DESCENDING);
            expect(result).toEqual(sortedDescendingObjectArray);
        });
        test('descending does not modify the original array', () => {
            const target = shuffledObjectArray;
            const result = sorting.selection(target,
                (a, b) => a.nest.id - b.nest.id,
                sorting.orderBy.DESCENDING);
            expect(target).not.toEqual(result);
        });
    });

});