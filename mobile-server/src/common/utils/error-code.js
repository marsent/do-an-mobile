// interface IerrorCode {
//   [key: string]: any;
// }
export const errorCode = {
  validate: 4000,
  'any.required': 4000100,
  'any.allowOnly': 4000101,
  'any.unknown': 4000102,
  'any.invalid': 4000103,
  'any.empty': 4000104,
  'any.notAvailable': 4000105,
  'boolean.base': 4000200,
  'number.base': 4000300,
  'number.min': 4000301,
  'number.max': 4000302,
  'number.less': 4000303,
  'number.greater': 4000304,
  'string.base': 4000400,
  'string.min': 4000401,
  'string.max': 4000402,
  'string.length': 4000403,
  'string.regex': 4000404,
  'string.regex.name': 4000405,
  'string.email': 4000406,
  'string.regex.base': 4000407,
  'object.allowUnknown': 4000500,
  'array.duplicate': 4000600,
  'array.unique': 4000601,
  'array.length': 4000602,
  'date.base': 4000700,
  'date.min': 4000701,
  'date.exceed': 4000702,
  'password.used': 4000800,
  'number.startAtZero': 4000801,
  'date.less': 4000802,
  authorization: 5000,
  server: 6000,
  client: 7000,

  //user
  'client.emailIsUsed': 7000001,
  'client.phoneNumberIsUsed': 7000002,
  'client.userExisted': 7000003,
  'client.userNotExists': 7000004,
  // admin
  'client.adminNotFound': 7000101,

  //auth
  'client.phoneNotExist': 7000102,
  'client.invalidPassword': 7000103,
  'client.verifyNotExist': 7000104,
  'client.infoIsUsed': 7000105,

  // student
  'client.studentExisted': 7000200,
  'client.studentNotFound': 7000201,

  // lecture
  'client.lectureExisted': 7000300,
  'client.lectureNotFound': 7000301,

  // class
  'client.classNotFound': 7000400,
  'client.classExisted': 7000401,
  'client.classNotMatch': 7000402,

  // exam
  'client.examExisted': 7000500,
  'client.examNotFound': 7000501,
  'client.examIsExpiredOrNotStart': 7000502,

  // answer
  'client.studentCanNotAccess': 7000600,
  'client.answerNotMatchQuestion': 7000601,
  'client.answerExisted': 7000602,

  // subject
  'client.subjectExisted': 7000700,
  'client.subjectNotFound': 7000701,
  'client.outOfTimeToUpdate': 7000702,

  // schedule
  'client.scheduleExisted': 7000800,
  'client.scheduleNotFound': 7000801,
  'client.noSubjectInSchedule': 7000802,

  action: 8000
};
