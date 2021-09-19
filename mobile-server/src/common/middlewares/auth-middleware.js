import jwt from 'jsonwebtoken';
import { LectureStatus } from '../../api/lecture/lecture.config';
import lectureService from '../../api/lecture/lecture.service';
import { StudentStatus } from '../../api/student/student.config';
import studentService from '../../api/student/student.service';
import { AdminStatuses } from '../admin/admin.config';
import adminService from '../admin/admin.service';
import { UserStatuses } from '../user/user.config';
import userService from '../user/user.service';
import BaseError from '../utils/base-error';
import { errorCode } from '../utils/error-code';

export async function isUser(req, res, next) {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not User'
        }
      });
    }
    const token = bearerToken.split(' ')[1];
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const user = await userService.findOne({ _id: data._id, status: UserStatuses.Active });
    if (!user) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not User'
        }
      });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export async function isAdmin(req, res, next) {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not User'
        }
      });
    }
    const token = bearerToken.split(' ')[1];
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const admin = await adminService.findOne({ _id: data._id, status: AdminStatuses.Active });
    if (!admin) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not Admin'
        }
      });
    }
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
}

export async function isStudent(req, res, next) {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not User'
        }
      });
    }
    const token = bearerToken.split(' ')[1];
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const student = await studentService.findOne({ _id: data._id, status: StudentStatus.Active });
    if (!student) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not a Student'
        }
      });
    }
    req.student = student;
    next();
  } catch (error) {
    next(error);
  }
}

export async function isLecture(req, res, next) {
  try {
    const bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not User'
        }
      });
    }
    const token = bearerToken.split(' ')[1];
    const data = await jwt.verify(token, process.env.JWT_KEY);
    const lecture = await lectureService.findOne({ _id: data._id, status: LectureStatus.Active });
    if (!lecture) {
      throw new BaseError({
        statusCode: 400,
        error: errorCode.authorization,
        errors: {
          autho: 'Not a Lecture'
        }
      });
    }
    req.lecture = lecture;
    next();
  } catch (error) {
    next(error);
  }
}
