import { Promise } from 'bluebird';
import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import { errorCode } from '../../common/utils/error-code';
import { generatePassword, generateStudentCode } from '../../common/utils/generate-student';
import hashPassword from '../../common/utils/hash-password';
import { sendMail } from '../../common/utils/send-mail';
import classService from '../class/class.service';
import scheduleService from '../schedule/schedule.service';
import { StudentStatus } from './student.config';
import studentService from './student.service';
import logger from '../../common/utils/logger';
import { ClassStatus } from '../class/class.config';
import lectureService from '../lecture/lecture.service';
import { LectureStatus } from '../lecture/lecture.config';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await studentService.findWithPagination({
          page,
          limit,
          select: '-password',
          sort,
          query
        });
        return new BaseResponse({ statusCode: 200, data: result })
          .addMeta({ total_page, total })
          .return(res);
      } catch (error) {
        next(error);
      }
    },
    async getById(req, res, next) {
      try {
        const { id } = req.params;
        const { select } = req.query;
        const result = await studentService.findOne({ _id: id }, '-password');
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { email, phone, year, class_id } = req.body;
        const [existedStudent, existedClass, existedLecture] = await Promise.all([
          studentService.findOne({
            status: StudentStatus.Active,
            $or: [
              {
                email
              },
              {
                phone
              }
            ]
          }),
          classService.findById(class_id),
          lectureService.findOne({
            status: LectureStatus.Active,
            $or: [
              {
                email
              },
              {
                phone
              }
            ]
          })
        ]);
        if (existedStudent) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              student: errorCode['client.studentExisted']
            }
          });
        }
        if (existedLecture) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              info: errorCode['client.infoIsUsed']
            }
          });
        }
        if (!existedClass) {
          throw new BaseError({
            statusCode: 404,
            error: errorCode.client,
            errors: {
              class: errorCode['client.classNotFound']
            }
          });
        }

        if (existedClass.year !== year) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              class: errorCode['client.classNotMatch']
            }
          });
        }
        // send emailllll

        const studentCode = await generateStudentCode(year);
        const password = generatePassword();
        const officialPassword = await hashPassword(password);
        const [student] = await Promise.all([
          studentService.create({
            ...req.body,
            password: officialPassword,
            decrypt_pass: password,
            student_code: studentCode
          }),
          sendMail({
            receiver: email,
            subject: 'New account',
            name: req.body.full_name,
            password
          })
        ]);
        await scheduleService.create({
          student_id: student._id,
          schedule: []
        });

        return new BaseResponse({
          statusCode: 400,
          data: student
        }).return(res);
      } catch (error) {
        logger.error(error, process.env.GMAIL_USER, process.env.GMAIL_PASS);
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const { id } = req.params;
        const { status, password, class_id } = req.body;
        const student = await studentService.findById(id);
        if (!student) {
          throw new BaseError({
            statusCode: 404,
            error: errorCode.client,
            errors: {
              student: errorCode['client.studentNotFound']
            }
          });
        }
        let update = {};
        if (class_id) {
          const updateClass = await classService.findOne({
            _id: class_id,
            status: ClassStatus.Active
          });
          if (!updateClass) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                class: errorCode['client.classNotFound']
              }
            });
          }
          if (updateClass.year !== student.year) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                class: errorCode['client.classNotMatch']
              }
            });
          }
          update.class_id = class_id;
        }
        if (status) {
          update.status = status;
        }
        if (status === 'active') {
          const existedStudent = await studentService.findOne({
            _id: { $ne: student._id },
            status: StudentStatus.Active,
            $or: [
              {
                email: student.email
              },
              {
                phone: student.phone
              }
            ]
          });
          if (existedStudent) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                student: errorCode['client.studentExisted']
              }
            });
          }
        }

        let decryptPass;
        if (password) {
          decryptPass = generatePassword();
          const hashingPassword = await hashPassword(decryptPass);
          update.decrypt_pass = decryptPass;
          update.password = hashingPassword;
        }
        const [result] = await Promise.all([
          studentService.findOneAndUpdate({ _id: id }, update, { new: true }),
          password &&
            sendMail({
              receiver: student.email,
              subject: 'Update account',
              name: student.full_name,
              password: decryptPass
            })
        ]);
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async resetPassword(req, res, next) {
      try {
        const { id } = req.params;
        const student = await studentService.findOne({ _id: id });
        if (!student) {
          throw new BaseError({
            statusCode: 404,
            error: errorCode.client,
            errors: {
              student: errorCode['client.studentNotFound']
            }
          });
        }
        const password = generatePassword();
        const officialPassword = await hashPassword(password);
        student.password = password;
        student.decrypt_pass = officialPassword;

        const [result] = await Promise.all([
          student.save(),
          sendMail({
            receiver: student.email,
            subject: 'Update account',
            name: student.full_name,
            password
          })
        ]);
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    }
  },
  student: {
    async get(req, res, next) {
      try {
        const { _id } = req.student;
        const result = await studentService.findById(_id);
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const { _id } = req.student;
        const { password, ...update } = req.body;
        if (password) {
          const hashingPassword = await hashPassword(password);
          update.decrypt_pass = password;
          update.password = hashingPassword;
        }
        const [result] = await await Promise.all([
          studentService.findOneAndUpdate({ _id }, update, { new: true }),
          password &&
            sendMail({
              receiver: req.student.email,
              subject: 'Update account',
              name: req.student.full_name,
              password
            })
        ]);
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    }
  }
};
