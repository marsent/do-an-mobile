import { Promise } from 'bluebird';
import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import { errorCode } from '../../common/utils/error-code';
import { generatePassword, generateStudentCode } from '../../common/utils/generate-student';
import hashPassword from '../../common/utils/hash-password';
import { sendMail } from '../../common/utils/send-mail';
import { StudentStatus } from '../student/student.config';
import studentService from '../student/student.service';
import { LectureStatus } from './lecture.config';
import lectureService from './lecture.service';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await lectureService.findWithPagination({
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
        const result = await lectureService.findOne({ _id: id }, '-password');
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { email, phone } = req.body;
        const [existedLecture, existedStudent] = await Promise.all([
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
          }),
          studentService.findOne({
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
        if (existedLecture) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              lecture: errorCode['client.lectureExisted']
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
        const password = generatePassword();
        const officialPassword = await hashPassword(password);
        const lecture = await Promise.all([
          lectureService.create({
            ...req.body,
            password: officialPassword,
            decrypt_pass: password
          }),
          sendMail({
            receiver: email,
            subject: 'New account',
            name: req.body.full_name,
            password
          })
        ]);
        return new BaseResponse({
          statusCode: 400,
          data: lecture
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const { id } = req.params;
        const { status, password, faculty } = req.body;
        const lecture = await lectureService.findById(id);
        if (!lecture) {
          throw new BaseError({
            statusCode: 404,
            error: errorCode.client,
            errors: {
              lecture: errorCode['client.lectureNotFound']
            }
          });
        }
        let update = {};
        if (status) {
          update.status = status;
        }
        if (status === 'active') {
          const existedLecture = await lectureService.findOne({
            _id: { $ne: id },
            status: 'active',
            $or: [
              {
                email: lecture.email
              },
              {
                phone: lecture.phone
              }
            ]
          });
          if (existedLecture) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                lecture: errorCode['client.lectureExisted']
              }
            });
          }
        }

        let decryptPassword;
        if (password) {
          decryptPass = generatePassword();
          const hashingPassword = await hashPassword(decryptPass);
          update.decrypt_pass = decryptPass;
          update.password = hashingPassword;
        }
        if (faculty) {
          update.faculty = faculty;
        }
        const [result] = await Promise.all([
          lectureService.findOneAndUpdate({ _id: id }, update, { new: true }),
          password &&
            sendMail({
              receiver: lecture.email,
              subject: 'Update account',
              name: lecture.full_name,
              password: decryptPassword
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
  lecture: {
    async get(req, res, next) {
      try {
        const { _id } = req.lecture;
        const result = await lectureService.findById(_id);
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
        const { _id } = req.lecture;
        const { password, ...update } = req.body;
        const { email } = req.body;
        if (password) {
          const hashingPassword = await hashPassword(password);
          update.decrypt_pass = password;
          update.password = hashingPassword;
        }
        if (email) {
          const [existedStudent, existedLecture] = await Promise.all([
            studentService.findOne({
              status: StudentStatus.Active,
              email
            }),
            lectureService.findOne({
              _id: { $ne: _id },
              status: LectureStatus.Active,
              email
            })
          ]);
          if (existedStudent || existedLecture) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                info: errorCode['client.infoIsUsed']
              }
            });
          }
        }
        const [result] = await Promise.all([
          lectureService.findOneAndUpdate({ _id }, update, { new: true }),
          password &&
            sendMail({
              receiver: req.lecture.email,
              subject: 'Update account',
              name: req.lecture.full_name,
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
