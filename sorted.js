/**
 * Created by sophiagames on 4/30/18.
 */

const sorted = (function () {

    /**
     * The order the results should be in
     * @type {{ASCENDING: string, DESCENDING: string}}
     */
    const orderBy = {
        ASCENDING: 'asc',
        DESCENDING: 'desc'
    };

    /**
     * Sorts an array by repeatedly finding the minimum (ascending) element.
     * @param {Array} target
     * @param {Compare} compare
     * @param {'asc' || 'desc'} order
     */
    const selection = (target, compare, order = 'asc') => {
        if (!_isArray(target)) {
            throw new TypeError('The first param should be an array.');
        }
        if (!compare) {
            throw new Error('Invalid comparison function');
        }
        const arr = _copy(target);
        switch (order) {
            case orderBy.ASCENDING:
                return _selectionByAscending(arr, compare);
            case orderBy.DESCENDING:
                return _selectionByDescending(arr, compare);
            default:
                throw new Error('Invalid order by type. Please specify (asc) or (desc) only as order param value');
        }
    };

    const _isObject = (obj) => (typeof obj === 'object');
    const _isArray = (arr) => arr.constructor === Array;

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

    /**
     * A comparison callback function used in the sorting algorithm
     * @callback Compare
     * @param a
     * @param b
     * @returns {number}
     */

    return {
        selection,
        orderBy
    };

})();

module.exports = sorted;