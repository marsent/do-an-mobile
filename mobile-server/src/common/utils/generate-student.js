import studentService from '../../api/student/student.service';

export const generatePassword = () => {
  return Math.floor(Math.random() * 100000000).toString();
};

export const generateStudentCode = async (year) => {
  const latestStudent = await studentService.findOne({}, null, { sort: { createdAt: -1 } });
  const studentCode = latestStudent ? latestStudent.student_code : '00000000';
  const studentEndFix = parseInt(studentCode.toString().split('').slice(4).join('')) + 1;
  return year + formatNumber(studentEndFix, 4);
};

function formatNumber(number, length) {
  while (number.toString().length < length) {
    number = '0' + number;
  }
  return number;
}
