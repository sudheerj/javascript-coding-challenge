function isNonObject(inputVal){
    return inputVal === null || typeof inputVal !== 'object';
}

function getType(inputVal){
    return Object.prototype.toString.call(inputVal).slice(8,-1).toLowerCase();
}

function deepClone2(inputVal){
    return deepCloneWithCache(inputVal, new WeakMap());
}

function deepCloneWithCache(inputVal, cache) {
    if(isNonObject(inputVal)) {
        return inputVal;
    }

    if(cache.has(inputVal)) {
        return cache.get(inputVal);
    }

    const type = getType(inputVal);
    let cloned;

    switch(type) {
        case 'set':
            cloned = new Set();
            cache.set(inputVal, cloned);
            inputVal.forEach(item => cloned.add(deepCloneWithCache(item, cache)));
            break;
        case 'map':
            cloned = new Map();
            cache.set(inputVal, cloned);
            inputVal.forEach((val, key) => cloned.set(deepCloneWithCache(key, cache), deepCloneWithCache(val, cache)));
            break;
        case 'array':
            cache.set(inputVal, cloned);
            cloned = inputVal.map(item => deepCloneWithCache(item, cache));
            break;
        case 'date':
            cloned = new Date(inputVal.getTime());
            break;
        case 'regex':
            cloned = new RegExp(inputVal.source, inputVal.flags);
            break;
        default: 
            cloned = Object.create(Object.getPrototypeOf(inputVal));
            cache.set(inputVal, cloned);
            for (const key of Reflect.ownKeys(inputVal)) {
                const desc = Object.getOwnPropertyDescriptor(inputVal, key);
                if(desc.get || desc.set) {
                    Object.defineProperty(cloned, key, desc);
                } else {
                    desc.value = deepCloneWithCache(inputVal[key], cache);
                    Object.defineProperty(cloned, key, desc);
                }
            }
    }
    return cloned;
}

//All possible types
const obj1 = {
    str: '',
    num: 0,
    bool: true,
    undef: undefined,
    null: null,
    map: new Map(),
    set: new Set(),
    obj: { name: 'John', age: 37 },
    arr: [1, 2, 3],
    date: new Date(),
    reg: new RegExp('/xyz/g'),
    [Symbol('x')]: 'abc',
  };

  const clonedObj1 = deepClone2(obj1);
  clonedObj1.num = 10;
  console.log(clonedObj1);
  console.log(obj1.num);

  //Circular reference
  const obj2 = { x: {y : {}}};
  obj2.x.y.z = obj2;
  const clonedObj2 = deepClone2(obj2);
  console.log(clonedObj2);
