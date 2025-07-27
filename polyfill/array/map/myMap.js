Array.prototype.myMap = function(callbackFunc, thisArg) {
    if(typeof callbackFunc !== 'function' || !callbackFunc.call || !callbackFunc.apply) {
        throw new TypeError('Callback must be a function');
    }

    const length = this.length;
    const A = new Array(length);
    let i = 0;

    while(i < length) {
        if(Object.hasOwn(this, i)) {
            A[i] = callbackFunc.call(thisArg, this[i], i, this);
        }
        i++;
    }

    return A;
}

// 1. Identity function
console.log([1, 2, 3].myMap(x => x));
// Expected: [1, 2, 3]

// 2. Square each number
console.log([1, 2, 3, 4].myMap(x => x * x));
// Expected: [1, 4, 9, 16]

// 3. Use of index
console.log(['a', 'b', 'c'].myMap((_, i) => i));
// Expected: [0, 1, 2]

// 4. Empty array
console.log([].myMap(x => x * 2));
// Expected: []

// 5. Sparse array handling (preserve holes)
const sparse = [1, , 3];
const result = sparse.myMap(x => x);
console.log(result);
// Expected: [1, <1 empty item>, 3]
console.log(result.hasOwnProperty(1));
// Expected: false (hole preserved)