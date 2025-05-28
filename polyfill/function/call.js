Function.prototype.myCall = function(thisArg, ...args) {
    // Properly handle null/undefined as globalThis, and convert primitives to objects
    thisArg = (thisArg === null || thisArg === undefined) ? globalThis : Object(thisArg);

    const uniqueId = Symbol('fn');
    thisArg[uniqueId] = this;

    const result = thisArg[uniqueId](...args);
    delete thisArg[uniqueId];

    return result;
}

Function.prototype.myCall1 = function(thisArg, ...args) {
    // Properly handle null/undefined as globalThis, and convert primitives to objects
    thisArg = (thisArg === null || thisArg === undefined) ? globalThis : Object(thisArg);

    const uniqueId = Symbol('fn');
    Object.defineProperty(thisArg, uniqueId, {
        enumerable: false,
        value: this
    });

    const result = thisArg[uniqueId](...args);
    delete thisArg[uniqueId];

    return result;
}

Function.prototype.myCall2 = function(thisArg, ...args) {
    return this.apply(thisArg, [...args]);
}

Function.prototype.myCall3 = function(thisArg, ...args) {
    return this.bind(thisArg, ...args)();
}

const person1 = {
    firstName: 'Sudheer',
    lastName: 'Jonna'
}

function details(age = 30) {
    return this.firstName + ' ' + this.lastName + ' is ' + age + ' years old';
}

console.log(details.myCall(person1, 35));
console.log(details.myCall1(person1, 35));
console.log(details.myCall2(person1, 35));
console.log(details.myCall3(person1, 35));