const year = new Date().getFullYear();
const yearList = [];
for (let i = year - 1; i <= year + 1; i++) yearList.push(i);
const facultyList = [
  'computer_science',
  'information_technology',
  'data_science',
  'computer_engineering',
  'information_systems',
  'e_commerce',
  'software_engineering',
  'information_security',
];

const apiURL = 'http://localhost:3000/api';
const authUrl = 'http://localhost:3000/auth/lecture/sign-in';

export {yearList, facultyList, apiURL, authUrl};
