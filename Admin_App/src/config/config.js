const year = new Date().getFullYear()
const years = ['Năm học'];
for (let i = year - 1; i <= year + 1; i++) years.push(i);
export const facultyList = ['Khoa', 'computer_science', 'information_technology', 'data_science', 'computer_engineering', 'information_systems', 'e_commerce', 'software_engineering', 'information_security'];
const value = {
    year: year,
    facultyList: facultyList,
}

export const yearList = years;
export const apiURL = 'http://quocha.xyz/api'
export const authUrl = 'http://quocha.xyz/auth/admin/sign-in'