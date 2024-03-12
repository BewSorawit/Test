// ดึงข้อมูลจากไฟล์ users.json ไปแสดงผล
const list = document.getElementById('list');

const getUsers = async () => {
    const response = await fetch('users.json');
    console.log(response);
    const json = await response.json();
    console.log(json);
    output = json.map(user => `<li>${user.name + " " + user.age}</li>`).join('');
    console.log(output);
    list.innerHTML = output;
}

const api = document.getElementById('api');
const getDataFromAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    console.log(response);
    const json = await response.json();
    console.log(json);
    output = json.map(user => `<li>${user.name + "=>" + user.company.name}</li>`).join('');
    console.log(output);
    list.innerHTML = output;
}
// getUsers()
getDataFromAPI()