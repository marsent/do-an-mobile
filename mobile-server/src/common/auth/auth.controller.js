import userService from '../user/user.service';
import BaseError from '../utils/base-error';
import { errorCode } from '../utils/error-code';
import BaseResponse from '../utils/base-response';
import { Promise } from 'bluebird';
import { sendMail } from '../utils/send-mail';
import { UserStatuses } from '../user/user.config';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generate-token';
import _ from 'lodash';
import hashPassword from '../utils/hash-password';
import createCode from '../utils/create-code';
import verifyService from '../verify/verify.service';
import adminService from '../admin/admin.service';
import { AdminStatuses } from '../admin/admin.config';
import { StudentStatus } from '../../api/student/student.config';
import lectureService from '../../api/lecture/lecture.service';
import { LectureStatus } from '../../api/lecture/lecture.config';
import studentService from '../../api/student/student.service';

export default {
  async register(req, res, next) {
    try {
      const user = req.body;
      const { email, password, phone } = req.body;
      const existedUser = await userService.findOne({
        $or: [{ email }, { phone }],
        status: 'active'
      });
      if (existedUser) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            user: errorCode['client.userExisted']
          }
        });
      }
      const hashedPassword = await hashPassword(password);
      const code = createCode();
      const [result] = await Promise.all([
        userService.create({
          ...user,
          password: hashedPassword
        })
        // sendMail({ receiver: email, subject: 'Verify your account' }),
      ]);
      verifyService.create({ user_id: result._id, code });
      return new BaseResponse({ statusCode: 200, data: _.omit(result, ['password']) }).return(res);
    } catch (error) {
      next(error);
    }
  },
  async userSignIn(req, res, next) {
    try {
      const { phone, password } = req.body;
      const user = await userService.findOne({
        phone,
        status: UserStatuses.Active,
        is_verified: true
      });
      if (!user) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            user: errorCode['client.userNotExists']
          }
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            password: errorCode['client.invalidPassword']
          }
        });
      }
      const token = generateToken({
        _id: user._id,
        phone: user.phone,
        email: user.email
      });
      const data = {
        ..._.omit(user.toJSON(), ['password']),
        token
      };
      return new BaseResponse({
        statusCode: 200,
        data
      }).return(res);
    } catch (error) {
      next(error);
    }
  },
  async verify(req, res, next) {
    try {
      const { user_id } = req.params;
      const { code } = req.body;
      const verify = await verifyService.findOne({ user_id, code });
      if (!verify) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            verify: errorCode['client.verifyNotExist']
          }
        });
      }
      await userService.findOneAndUpdate({ _id: user_id }, { is_verified: true });
      verifyService.deleteOne({ user_id, code });
      return new BaseResponse({
        statusCode: 200,
        data: null,
        message: 'verify successfully'
      }).return(res);
    } catch (error) {
      next(error);
    }
  },
  async adminLogin(req, res, next) {
    try {
      const { phone, password } = req.body;
      const admin = await adminService.findOne({
        phone,
        status: AdminStatuses.Active
      });
      if (!admin) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            admin: errorCode['client.adminNotFound']
          }
        });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            password: errorCode['client.invalidPassword']
          }
        });
      }
      const token = generateToken({
        _id: admin._id,
        phone: admin.phone,
        email: admin.email
      });
      const data = {
        ..._.omit(admin.toJSON(), ['password']),
        token
      };
      return new BaseResponse({
        statusCode: 200,
        data
      }).return(res);
    } catch (error) {
      next(error);
    }
  },
  async studentLogin(req, res, next) {
    try {
      const { phone, password } = req.body;
      const student = await studentService.findOne({
        phone,
        status: StudentStatus.Active
      });
      if (!student) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            student: errorCode['client.studentNotFound']
          }
        });
      }
      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            password: errorCode['client.invalidPassword']
          }
        });
      }
      const token = generateToken({
        _id: student._id,
        phone: student.phone,
        email: student.email
      });
      const data = {
        ..._.omit(student.toJSON(), ['password']),
        token
      };
      return new BaseResponse({
        statusCode: 200,
        data
      }).return(res);
    } catch (error) {
      next(error);
    }
  },
  async lectureLogin(req, res, next) {
    try {
      const { phone, password } = req.body;
      const lecture = await lectureService.findOne({
        phone,
        status: LectureStatus.Active
      });
      if (!lecture) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            lecture: errorCode['client.lectureNotFound']
          }
        });
      }
      const validPassword = await bcrypt.compare(password, lecture.password);
      if (!validPassword) {
        throw new BaseError({
          statusCode: 400,
          error: errorCode.client,
          errors: {
            password: errorCode['client.invalidPassword']
          }
        });
      }
      const token = generateToken({
        _id: lecture._id,
        phone: lecture.phone,
        email: lecture.email
      });
      const data = {
        ..._.omit(lecture.toJSON(), ['password']),
        token
      };
      return new BaseResponse({
        statusCode: 200,
        data
      }).return(res);
    } catch (error) {
      next(error);
    }
  }
};
