import { Promise } from 'bluebird';
import moment from 'moment';
import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import { errorCode } from '../../common/utils/error-code';
import { generatePassword, generateStudentCode } from '../../common/utils/generate-student';
import hashPassword from '../../common/utils/hash-password';
import classService from '../class/class.service';
import scheduleService from '../schedule/schedule.service';
import studentService from '../student/student.service';
import { subjectStatuses } from '../subject/subject.config';
import subjectService from '../subject/subject.service';
import { ExamFor, ExamStatus, ObjectCreateExam } from './exam.config';
import examService from './exam.service';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await examService.findWithPagination({
          page,
          limit,
          select,
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
        const result = await examService.findOne({ _id: id }, select);
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { _id: admin_id } = req.admin;
        const { class_id, student_ids, name, subject_id } = req.body;
        const [existedExam] = await Promise.all([
          examService.findOne({ name, status: ExamStatus.Active }),
          class_id && classService.findActive({ _id: class_id }),
          student_ids && studentService.checkStudentActive(student_ids),
          subject_id &&
            subjectService.findEnsure({ _id: subject_id, status: subjectStatuses.Active })
        ]);
        if (existedExam) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              exam: errorCode['client.examExisted']
            }
          });
        }
        const data = {
          ...req.body,
          object_id: admin_id,
          created_by: ObjectCreateExam.Admin
        };
        const exam = await examService.create(data);
        return new BaseResponse({
          statusCode: 400,
          data: exam
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const { id } = req.params;
        const { class_id, student_ids, name } = req.body;
        const [exam, existedExam] = await Promise.all([
          examService.findById(id),
          name && examService.findOne({ _id: { $ne: id }, name, status: ExamStatus.Active }),
          class_id && classService.findActive({ _id: class_id }),
          student_ids && studentService.checkStudentActive(student_ids)
        ]);
        if (!exam) {
          throw new BaseError({
            statusCode: 404,
            error: errorCode.client,
            errors: {
              exam: errorCode['client.examNotFound']
            }
          });
        }
        if (existedExam) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              exam: errorCode['client.examExisted']
            }
          });
        }
        if (moment.utc().toDate() >= exam.start_at) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              time: errorCode['client.outOfTimeToUpdate']
            }
          });
        }
        const result = await examService.findOneAndUpdate({ _id: id }, req.body, { new: true });
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async updateStatus(req, res, next) {
      try {
        const { id } = req.params;
        const { status } = req.body;
        const exam = await examService.findOne({ _id: id });
        if (status === 'active') {
          const existedExam = await examService.findOne({
            _id: { $ne: id },
            name: exam.name,
            status: ExamStatus.Active
          });
          if (existedExam) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                exam: errorCode['client.examExisted']
              }
            });
          }
        }
        exam.status = status;
        const result = await exam.save();
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
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await examService.findWithPagination({
          page,
          limit,
          select,
          sort,
          query: { ...query }
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
        const result = await examService.findOne({ _id: id }, select);
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { _id: object_id } = req.lecture;
        const { class_id, student_ids, name } = req.body;
        const [existedExam] = await Promise.all([
          examService.findOne({ name, status: ExamStatus.Active }),
          class_id && classService.findActive({ _id: class_id }),
          student_ids && studentService.checkStudentActive(student_ids)
        ]);
        if (existedExam) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              exam: errorCode['client.examExisted']
            }
          });
        }
        const data = {
          ...req.body,
          object_id: object_id,
          created_by: ObjectCreateExam.Lecture
        };
        const exam = await examService.create(data);
        return new BaseResponse({
          statusCode: 400,
          data: exam
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const { _id: object_id } = req.lecture;
        const { id } = req.params;
        const { class_id, student_ids, name } = req.body;
        const [exam, existedExam] = await Promise.all([
          examService.findOne({ _id: id, object_id }),
          name && examService.findOne({ _id: { $ne: id }, name, status: ExamStatus.Active }),
          class_id && classService.findActive({ _id: class_id }),
          student_ids && studentService.checkStudentActive(student_ids)
        ]);
        if (existedExam) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              exam: errorCode['client.examExisted']
            }
          });
        }
        if (!exam) {
          throw new BaseError({
            statusCode: 404,
            error: errorCode.client,
            errors: {
              exam: errorCode['client.examNotFound']
            }
          });
        }
        if (moment.utc().toDate() >= exam.start_at) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              time: errorCode['client.outOfTimeToUpdate']
            }
          });
        }
        const result = await examService.findOneAndUpdate({ _id: id }, req.body, { new: true });
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async updateStatus(req, res, next) {
      try {
        const { _id: object_id } = req.lecture;
        const { id } = req.params;
        const { status } = req.body;
        const exam = await examService.findEnsure({ _id: id, object_id });
        if (status === 'active') {
          const existedExam = await examService.findOne({
            _id: { $ne: id },
            name: exam.name,
            status: ExamStatus.Active
          });
          if (existedExam) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                exam: errorCode['client.examExisted']
              }
            });
          }
        }
        exam.status = status;
        const result = await exam.save();
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
        const { _id: student_id } = req.student;
        const { limit, page, select, sort, ...query } = req.query;
        const schedule = await scheduleService.findOne({ student_id });
        const [result, { total_page, total }] = await examService.findWithPagination({
          page,
          limit,
          select,
          sort,
          query: {
            $or: [
              { class_id: req.student.class_id },
              { for: ExamFor.All },
              { student_ids: student_id },
              { for: ExamFor.Subject, subject_id: { $in: schedule.subject_ids } }
            ],
            ...query
          }
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
        const { _id: student_id } = req.student;
        const { id } = req.params;
        const { select } = req.query;
        const result = await examService.findOne(
          {
            _id: id,
            $or: [
              { class_id: req.student.class_id },
              { for: ExamFor.All },
              { student_ids: student_id },
              { for: ExamFor.Subject, subject_id: { $in: schedule.subject_ids } }
            ]
          },
          select
        );
        return new BaseResponse({ statusCode: 200, data: result })
          .addMeta({ total_page, total })
          .return(res);
      } catch (error) {
        next(error);
      }
    },
    async search(req, res, next) {
      try {
        const { name, limit, page } = req.query;
        const [result, { total_page, total }] = await examService.findWithPagination({
          query: { $text: { $search: name } },
          limit,
          page
        });
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    }
  }
};
