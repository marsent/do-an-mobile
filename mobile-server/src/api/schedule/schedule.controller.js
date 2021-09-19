import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import scheduleService from './schedule.service';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await scheduleService.findWithPagination({
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
        const result = await scheduleService.findOne({ _id: id }, select);
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    }
  },
  student: {
    async get(req, res, next) {
      try {
        const { _id } = req.student;
        const { limit, page, select, sort, ...query } = req.query;
        const result = await scheduleService.findOne({ student_id: _id });
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    }
  }
};
