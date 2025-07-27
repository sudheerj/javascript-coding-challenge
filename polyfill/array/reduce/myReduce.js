Array.prototype.myReduce = function(callbackFunc, initialValue) {
    const hasNoInitialValue = initialValue === undefined;
    const length = this.length;
    if(typeof callbackFunc !== 'function') {
        throw new TypeError('Callback must be a function');
    }

    if(hasNoInitialValue && length === 0) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    let acc = hasNoInitialValue ? this[0] : initialValue;
    let i = hasNoInitialValue ? 1 : 0;

    while(i < length) {
        if(Object.hasOwn(this, i)) {
            acc = callbackFunc(acc, this[i], i, this);
        }
        i++;
    }

    return acc;
}

// 1. Sum all numbers (no initial value)
console.log([1, 2, 3, 4].myReduce((acc, val) => acc + val));
// Expected: 10

// 2. Product with initial value
console.log([2, 3, 4].myReduce((acc, val) => acc * val, 2));
// Expected: 48

// 3. Concatenate strings
console.log(['a', 'b', 'c'].myReduce((acc, val) => acc + val));
// Expected: 'abc'

// 4. Use of index (sum of values at even indices)
console.log([10, 20, 30, 40].myReduce((acc, val, idx) => idx % 2 === 0 ? acc + val : acc, 0));
// Expected: 40

// 5. Empty array with initial value
console.log([].myReduce((acc, val) => acc + val, 100));
// Expected: 100