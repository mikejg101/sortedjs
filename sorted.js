/**
 * Created by Michael Goodwin on 4/30/18.
 * A collection of sorting algorithms.
 */
const sorted = (function () {
    const _isObject = (obj) => (typeof obj === 'object');
    const _isFunction = (fn) => (typeof fn !== 'function');
    const _isAscending = (orderBy) => (orderBy === 'asc');
    const _isDescending = (orderBy) => (orderBy === 'desc');
    const _isArray = (arr) => arr.constructor === Array;
    const _paramIsArray = (fn, idx) => {
        const index = idx;
        return function () {
            if (!_isArray(arguments[index])) {
                throw new TypeError('The first param should be an array.');
            }
            return fn.apply(this, arguments)
        }
    };
    const _paramIsComparisonFunction = (fn, idx) => {
        const index = idx;
        return function () {
            if (!arguments[index] || _isFunction(arguments[index])) {
                throw new Error('Invalid comparison function');
            }
            return fn.apply(this, arguments)
        }
    };
    const _paramIsValidOrderBy = (fn, idx) => {
        const index = idx;
        return function () {
            const param = arguments[index];
            if (!param || (!_isAscending(param) && !_isDescending(param))) {
                throw new Error('Invalid order by type. Please specify (asc) or (desc) only as order param value');
            }
            return fn.apply(this, arguments)
        }
    };
    const _selectionValidator = (fn) => {
        return _paramIsValidOrderBy(
            _paramIsComparisonFunction(
                _paramIsArray(fn, 0), 1), 2);
    };
    const _insertionValidator = (fn) => {
        return _paramIsValidOrderBy(
            _paramIsComparisonFunction(
                _paramIsArray(fn, 0), 1), 2);
    };

    // TODO This should perform a deep copy.
    const _copy = (target) => {
        let result = Array.isArray(target) ? [] : {};
        let value;
        let key;
        for (key in target) {
            if (target.hasOwnProperty(key)) {
                value = target[key];
                result[key] = _isObject(value)
                    ? _copy(value)
                    : value;
            }
        }
        return result;
    };
    const _swap = (arr, aIndex, bIndex) => {
        let temp = arr[aIndex];
        arr[aIndex] = arr[bIndex];
        arr[bIndex] = temp;
    };
    const _selectionByAscending = (arr, compare) => {
        const length = arr.length;
        for (let index = 0; index < length - 1; index++) {
            let minIndex = index;
            for (let searchIndex = index + 1; searchIndex < length; searchIndex++) {
                if (compare(arr[searchIndex], arr[minIndex]) < 0) {
                    minIndex = searchIndex;
                }
            }
            _swap(arr, minIndex, index);
        }
        return arr;
    };
    const _selectionByDescending = (arr, compare) => {
        const length = arr.length;
        for (let index = length - 1; index >= 0; index--) {
            let minIndex = index;
            for (let searchIndex = 1; searchIndex <= index; searchIndex++) {
                if (compare(arr[searchIndex], arr[minIndex]) < 0) {
                    minIndex = searchIndex;
                }
            }
            _swap(arr, minIndex, index);
        }
        return arr;
    };
    const _insertionByAscending = (arr, compare) => {
        const length = arr.length;
        for (let index = 1; index < length; index++) {
            let target = arr[index];
            let current = index;
            while (current > 0 && compare(arr[current - 1], target) > 0) {
                _swap(arr, current, current - 1);
                current--;
            }
        }
        return arr;
    };
    const _insertionByDescending = (arr, compare) => {
        const length = arr.length;
        for (let index = length - 1; index >= 0; index--) {
            let target = arr[index];
            let current = index;
            while (current > 0 && compare(arr[current - 1], target) < 0) {
                _swap(arr, current, current - 1);
                current--;
            }
        }
        return arr;
    };

    /**
     * The order the results should be in
     * @type {{ASCENDING: string, DESCENDING: string}}
     */
    const orderBy = {
        ASCENDING: 'asc',
        DESCENDING: 'desc'
    };

    /**
     * Sorts an array using selection sort.
     * @param {Array} target
     * @param {Compare} compare
     * @param {'asc' || 'desc'} order
     */
    const selection = (target, compare, order = 'asc') => {
        const arr = _copy(target);
        return _isAscending(order)
            ? _selectionByAscending(arr, compare)
            : _selectionByDescending(arr, compare);
    };

    /**
     * Sorts an array using insertion sort.
     * @param {Array} target
     * @param {Compare} compare
     * @param {'asc' || 'desc'} order
     */
    const insertion = (target, compare, order = 'asc') => {
        const arr = _copy(target);
        return _isAscending(order)
            ? _insertionByAscending(arr, compare)
            : _insertionByDescending(arr, compare);
    };

    /**
     * A comparison callback function used in the sorting algorithm
     * @callback Compare
     * @param a
     * @param b
     * @returns {number}
     */

    return {
        selection: _selectionValidator(selection),
        insertion: _insertionValidator(insertion),
        orderBy
    };

})();

module.exports = sorted;