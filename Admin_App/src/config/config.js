const year = new Date().getFullYear()
const years = [];
for (let i = year - 1; i <= year + 1; i++) years.push(i);
export const facultyList = ['computer_science', 'information_technology', 'data_science', 'computer_engineering', 'information_systems', 'e_commerce', 'software_engineering', 'information_security'];
const value = {
    year: year,
    facultyList: facultyList,
}

export const yearList = years;
export const apiURL = 'http:/localhost:3000/api'
export const authUrl = 'http://localhost:3000/auth/admin/sign-in'