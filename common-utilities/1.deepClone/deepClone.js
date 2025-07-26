//Approach1: Recursive
function deepClone1(value){
    //Handle primitives
    if(typeof value !== 'object' || value === null) {
        return value;
    }

    //Handle array type
    if(Array.isArray(value)) {
        return value.map(item => deepClone1(item));
    }

    //Handle object types
    let objCopy = {};
    for (const key in value) {
        if(value.hasOwnProperty(key)) {
            objCopy[key] = deepClone1(value[key]);
        }
    }

    return objCopy;
}

//Approach2: JSON Stringify(Serialize and Deserialize) with downsides
function deepClone2(value) {
    return JSON.parse(JSON.stringify(value));
}

//Approach3: Native browser `structuredClone`API support
function deepClone3(value) {
    return structuredClone(value);
}

const obj1 = { employee: { name: 'John', age: 30 } };
const clonedObj1 = deepClone1(obj1);

clonedObj1.employee.age = 35;
console.log(clonedObj1.employee.age); // 35
console.log(obj1.employee.age); // 30

const obj2 = { fruits: [{ name: 'banana' }, { name: 'apple' }] };
const clonedObj2 = deepClone1(obj2);

obj2.fruits[1].name = 'orange';
console.log(obj2.fruits[1].name); // 'orange'
console.log(clonedObj2.fruits[1].name); // 'apple'

console.log(deepClone2(obj1));
console.log(deepClone3(obj1));

