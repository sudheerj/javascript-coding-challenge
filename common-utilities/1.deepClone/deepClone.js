//Approach1: Recursive
function deepClone(value){
    //Handle primitives
    if(typeof value !== 'object' || value === null) {
        return value;
    }

    //Handle array type
    if(Array.isArray(value)) {
        let arrCopy = [];
        for(let i=0; i < value.length; i++){
            arrCopy[i] = deepClone(value[i]);
        }
        return arrCopy;
    }

    //Handle object types
    let objCopy = {};
    for (const key in value) {
        if(value.hasOwnProperty(key)) {
            objCopy[key] = deepClone(value[key]); 
        }
    }

    return objCopy;
}

//Approach2: JSON Stringify(Serialize and Deserialize) with downsides

function deepClone1(value) {
    return JSON.parse(JSON.stringify(value));
}

//Approach3: Native browser `structuredClone`API support

function deepClone2(value) {
    return structuredClone(value);
}

const obj1 = { employee: { name: 'John', age: 30 } };
const clonedObj1 = deepClone(obj1);

clonedObj1.employee.age = 35;
console.log(clonedObj1.employee.age); // 35
console.log(obj1.employee.age); // 30

const obj2 = { friuts: [{ name: 'banana' }, { name: 'apple' }] };
const clonedObj2 = deepClone(obj2);

obj2.friuts[1].name = 'orange';
console.log(obj2.friuts[1].name); // 'orange'
console.log(clonedObj2.friuts[1].name); // 'apple'

console.log(deepClone1(obj1));
console.log(deepClone2(obj1));

