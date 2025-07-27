Array.prototype.myFilter = function(callbackFunc, thisArg) {
    if(typeof callbackFunc !== 'function' || !callbackFunc.call || !callbackFunc.apply) {
        throw new TypeError('Callback must be a function');
    }

    const result = [];
    let i = 0;

    while(i < this.length) {
        if(Object.hasOwn(this, i) && callbackFunc.call(thisArg, this[i], i, this)) {
            result.push(this[i]);
        }
        i++;
    }

    return result;
}

// 1. Identity filter (truthy values)
console.log([1, 0, 2, '', 3].myFilter(x => x));
// Expected: [1, 2, 3]

// 2. Filter even numbers
console.log([1, 2, 3, 4, 5, 6].myFilter(x => x % 2 === 0));
// Expected: [2, 4, 6]

// 3. Use of index (keep even indices)
console.log(['a', 'b', 'c', 'd'].myFilter((_, i) => i % 2 === 0));
// Expected: ['a', 'c']

// 4. Empty array
console.log([].myFilter(x => x > 0));
// Expected: []

// 5. Sparse array handling (preserve holes)
const sparse = [1, , 3, undefined, 5];
const result = sparse.myFilter(x => x !== undefined);
console.log(result);
// Expected: [1, 3, 5]

// 6. Callback always false
console.log([1, 2, 3].myFilter(() => false));
// Expected: []

// 7. Callback always true
console.log([1, 2, 3].myFilter(() => true));
// Expected: [1, 2, 3]