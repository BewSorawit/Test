// javascript object
// create obj
const user = { name: 'John', age: 27, getData() { return this.name + "\t" + this.age } }

// access object
console.log('1 : ' , user);
console.log(typeof(user));

// JSON String

// obj->string
const userJSON = JSON.stringify(user);
console.log('2 : ' , userJSON);
console.log(typeof (userJSON));

// string -> object
const userJSON2 = JSON.parse(userJSON);
console.log('3 : ' , userJSON2);
console.log(typeof (userJSON2));