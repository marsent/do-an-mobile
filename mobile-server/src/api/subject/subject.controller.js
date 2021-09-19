import { Promise } from 'bluebird';
import moment from 'moment';
import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import { errorCode } from '../../common/utils/error-code';
import { LectureStatus } from '../lecture/lecture.config';
import lectureService from '../lecture/lecture.service';
import scheduleService from '../schedule/schedule.service';
import { subjectStatuses } from './subject.config';
import subjectService from './subject.service';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await subjectService.findWithPagination({
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
        const result = await subjectService.findOne({ _id: id }, select, { populate: 'lecture' });
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { name, subject_code, lecture_id } = req.body;
        const [existedSubject, lecture] = await Promise.all([
          subjectService.findOne({
            name,
            subject_code,
            status: subjectStatuses.Active
          }),
          lectureService.findOne({ _id: lecture_id, status: LectureStatus.Active })
        ]);
        if (existedSubject) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              class: errorCode['client.subjectExisted']
            }
          });
        }
        if (!lecture) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              lecture: errorCode['client.lectureNotFound']
            }
          });
        }
        const result = await subjectService.create(req.body);
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
        const { id } = req.params;
        const { name, subject_code, lecture_id } = req.body;
        const update = req.body;
        const [subject, existedSubject, lecture] = await Promise.all([
          subjectService.findById(id),
          subjectService.findOne({
            _id: { $ne: id },
            $or: [{ name }, { subject_code }],
            status: subjectStatuses.Active
          }),
          lecture_id && lectureService.findOne({ _id: lecture_id, status: LectureStatus.Active })
        ]);
        if (lecture_id && !lecture) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              lecture: errorCode['client.lectureNotFound']
            }
          });
        }

        if (moment.utc().toDate() >= subject.register_at) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              time: errorCode['client.outOfTimeToUpdate']
            }
          });
        }

        if (!subject) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              subject: errorCode['client.subjectNotFound']
            }
          });
        }
        if (existedSubject) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              subject: errorCode['client.subjectExisted']
            }
          });
        }
        const result = await subjectService.findOneAndUpdate({ _id: id }, update, { new: true });
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
    async register(req, res, next) {
      try {
        const { id } = req.params;
        const { _id: student_id } = req.student;
        let [subject, schedule] = await Promise.all([
          subjectService.findEnsure({
            _id: id,
            status: subjectStatuses.Active,
            options: {
              populate: [{ path: 'lecture', match: { status: LectureStatus.Active } }]
            }
          }),
          scheduleService.findOne({ student_id })
        ]);
        if (!schedule) {
          schedule = await scheduleService.create({
            student_id: student_id,
            schedule: []
          });
        }
        if (!subject.lecture) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              lecture: errorCode['client.lectureNotFound']
            }
          });
        }
        if (
          moment.utc().toDate() < subject.register_at ||
          moment.utc().toDate() > subject.end_register_at
        ) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              time: errorCode['client.outOfTimeToUpdate']
            }
          });
        }

        const newSchedule = subject.schedule;
        if (!newSchedule) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              schedule: errorCode['client.scheduleNotFound']
            }
          });
        }
        newSchedule.forEach((nSchedule) => {
          const existedDaySchedule =
            schedule && schedule.schedule.find((item) => item.weekday === nSchedule.weekday);
          if (
            existedDaySchedule &&
            existedDaySchedule.details.find(
              (i) =>
                i.from > nSchedule.to ||
                i.to < nSchedule.from ||
                (i.from === nSchedule.from && i.to === nSchedule.to)
            )
          ) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                schedule: errorCode['client.scheduleExisted']
              }
            });
          }

          if (existedDaySchedule) {
            existedDaySchedule.details.push({
              subject_id: id,
              from: nSchedule.from,
              to: nSchedule.to,
              lecture_name: subject.lecture.full_name,
              subject_name: subject.name
            });
          } else {
            schedule.schedule.push({
              weekday: nSchedule.weekday,
              details: [
                {
                  subject_id: id,
                  from: nSchedule.from,
                  to: nSchedule.to,
                  lecture_name: subject.lecture.full_name,
                  subject_name: subject.name
                }
              ]
            });
          }
          if (!schedule.subject_ids.includes(id.toString())) schedule.subject_ids.push(id);
        });

        const result = await schedule.save();
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async cancel(req, res, next) {
      try {
        const { id } = req.params;
        const { _id: student_id } = req.student;
        const [subject, schedule] = await Promise.all([
          subjectService.findEnsure({ _id: id }),
          scheduleService.findOne({ student_id })
        ]);
        if (!schedule) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              schedule: errorCode['client.noSubjectInSchedule']
            }
          });
        }
        if (
          moment.utc().toDate() < subject.register_at ||
          moment.utc().toDate() > subject.end_register_at
        ) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              time: errorCode['client.outOfTimeToUpdate']
            }
          });
        }
        subject.schedule.map((item) => {
          const registeredSchedule = schedule.schedule.find(
            (sched) => sched.weekday === item.weekday
          );
          if (!registeredSchedule) {
            throw new BaseError({
              statusCode: 400,
              error: errorCode.client,
              errors: {
                schedule: errorCode['client.scheduleNotFound']
              }
            });
          }
          let removeIndex;
          const detailIndex = registeredSchedule.details.find((detail, index) => {
            if (detail.subject_id.toString() === subject._id.toString()) {
              removeIndex = index;
              return true;
            }
          });
          if (detailIndex) registeredSchedule.details.splice(removeIndex, 1);
        });
        let cancelIndex = -1;
        schedule.subject_ids.find((item, index) => {
          if (item.toString() === id.toString()) {
            cancelIndex = index;
          }
        });
        if (cancelIndex !== -1) {
          schedule.subject_ids.splice(cancelIndex, 1);
        }
        const result = await schedule.save();
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    }
  },
  async get(req, res, next) {
    try {
      const { limit, page, select, sort, ...query } = req.query;
      const [result, { total_page, total }] = await subjectService.findWithPagination({
        page,
        limit,
        select,
        sort,
        query: { ...query, status: subjectStatuses.Active }
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
      const result = await subjectService.findOne(
        { _id: id, status: subjectStatuses.Active },
        select
      );
      return new BaseResponse({ statusCode: 200, data: result }).return(res);
    } catch (error) {
      next(error);
    }
  }
};
