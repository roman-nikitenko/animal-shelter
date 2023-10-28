// @ts-ignore

const BASE_URL: string = 'https://happy-paws-pqwx.onrender.com/api/pets/statistic/';

const res = fetch(BASE_URL)
.then(response => response.json())
.then(data => {
  console.log(data);
});

console.log(res);
