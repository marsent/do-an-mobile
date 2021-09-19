import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import { errorCode } from '../../common/utils/error-code';
import studentService from '../student/student.service';
import { ExamStatus, ObjectCreateExam } from '../exam/exam.config';
import examService from '../exam/exam.service';
import { ExamFor } from '../exam/exam.config';
import answerService from './answer.service';
import { AnswerStatus } from './answer.config';
import moment from 'moment';
import scheduleService from '../schedule/schedule.service';
import { Promise } from 'bluebird';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await answerService.findWithPagination({
          page,
          limit,
          select,
          sort,
          populate: {
            path: 'student',
            select: '-password '
          },
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
        const result = await answerService.findOne({ _id: id }, select, {
          populate: {
            path: 'student',
            select: '-password '
          }
        });
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async updateStatus(req, res, next) {
      try {
        const { id } = req.params;
        const { status } = req.body;
        const answer = await answerService.findOne({ _id: id });
        if (status === 'active') {
          const existedAnswer = await answerService.findOne({
            _id: { $ne: id },
            exam_id: answer.exam_id,
            student_id: answer.student_id
          });
          if (existedAnswer) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                exam: errorCode['client.examExisted']
              }
            });
          }
        }
        answer.status = status;
        const result = await answer.save();
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
        const { _id: lecture_id } = req.lecture;
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await answerService.findWithPagination({
          page,
          limit,
          select,
          sort,
          populate: {
            path: 'student',
            select: '-password '
          },
          query: { ...query, lecture_id }
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
        const { _id: lecture_id } = req.lecture;
        const { id } = req.params;
        const { select } = req.query;
        const result = await answerService.findOne({ _id: id, lecture_id }, select, {
          populate: {
            path: 'student',
            select: '-password '
          }
        });
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async updateStatus(req, res, next) {
      try {
        const { _id: lecture_id } = req.lecture;
        const { id } = req.params;
        const { status } = req.body;
        const answer = await answerService.findOne({ _id: id, lecture_id });
        if (status === 'active') {
          const existedAnswer = await answerService.findOne({
            _id: { $ne: id },
            exam_id: answer.exam_id,
            student_id: answer.student_id
          });
          if (existedAnswer) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                exam: errorCode['client.examExisted']
              }
            });
          }
        }
        answer.status = status;
        const result = await answer.save();
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
        const [result, { total_page, total }] = await answerService.findWithPagination({
          page,
          limit,
          select,
          sort,
          query: { ...query, student_id }
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
        const result = await answerService.findOne({ _id: id, student_id }, select);
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async submit(req, res, next) {
      try {
        const { _id: student_id } = req.student;
        const { finish_time, answer, exam_id } = req.body;
        const [exam, student, existedAnswer, schedule] = await Promise.all([
          examService.findEnsure({ _id: exam_id, status: ExamStatus.Active }),
          studentService.findOne({ _id: student_id }),
          answerService.findOne({ exam_id, student_id, status: AnswerStatus.Active }),
          scheduleService.findOne({ student_id })
        ]);
        if (existedAnswer) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              answer: errorCode['client.answerExisted']
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
        if (moment.utc().toDate() > exam.expire_at || moment.utc().toDate() < exam.start_at) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              date: errorCode['client.examIsExpiredOrNotStart']
            }
          });
        }
        if (
          (exam.for === ExamFor.Class &&
            student.class_id.toString() !== exam.class_id.toString()) ||
          (exam.for === ExamFor.Group && !exam.student_ids.includes(student_id)) ||
          (exam.for === ExamFor.Subject && !schedule.subject_ids.includes(exam.subject_id))
        ) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              student: errorCode['client.studentCanNotAccess']
            }
          });
        }
        if (exam.questions.length !== answer.length) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              answer: errorCode['client.answerNotMatchQuestion']
            }
          });
        }
        let score = 0;
        exam.questions.forEach((question, index) => {
          if (question.answer === answer[index]) {
            score++;
          }
        });
        const avgScore = (score / answer.length) * 10;
        const result = await answerService.create({
          student_id,
          exam_id,
          answer,
          score: avgScore,
          finish_time,
          lecture_id: exam.created_by === ObjectCreateExam.Lecture ? exam.object_id : null,
          subject_id: exam.subject_id
        });

        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    }
  }
};
