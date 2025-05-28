Function.prototype.myBind = function(thisArg, ...args){

    if(typeof this !== 'function') {
        return new Error('Bind must be called on a function');
    }

    const originalFunc = this;

    function boundFunction(...innerArgs) {

        if(this instanceof boundFunction) {
            return new originalFunc(args.concat(innerArgs));
        }

        return originalFunc.apply(thisArg, args.concat(innerArgs));
    }

    if(originalFunc.prototype) {
        boundFunction.prototype = originalFunc.prototype;
    }

    return boundFunction;
}

Function.prototype.myBind1 = function(thisArg, ...args){
    if(typeof this !== 'function') {
        return new Error("Bind must be called on a function");
    }

    const uniqueId = Symbol('fn');
    const wrappedObj = Object(thisArg);

    Object.defineProperty(wrappedObj, uniqueId, {
        enumerable: false,
        value: this
    });

    return function(...innerArgs){
        return wrappedObj[uniqueId](...args, ...innerArgs)
    }
}

Function.prototype.myBind2 = function(thisArg, ...args){
    const originalFunc = this;

    if(typeof originalFunc !== 'function') {
        return new Error("Bind must be called on a function");
    }

    return function(...innerArgs){
        return Reflect.apply(originalFunc, thisArg, [...args, ...innerArgs])
    }
}

// ------------------------------------------------------

function fullName(greeting) {
    console.log(`${greeting}, I'm ${this.firstName} ${this.lastName}`);
}

const person1 = {
    firstName: 'Sudheer',
    lastName: 'Jonna'
};

const person2 = {
    firstName: "John",
    lastName: "Smith"
};

const boundFullName1 = fullName.myBind(person1, "Hello");
const boundFullName2 = fullName.myBind1(person2, "Hey");
const boundFullName3 = fullName.myBind2(person2, "Hi");

boundFullName1();
boundFullName2();
boundFullName3();