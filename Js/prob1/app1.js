// j
const user = `{
    "name": "Bronw",
    "age": 21,
    "phone": null,
    "status": true
}`
console.log(user);

// json parse -> json string -> json object
const user2 = JSON.parse(user)
console.log(user2);

// json stringify -> json object -> json string
const user3 = JSON.stringify(user2)
console.log(user3);