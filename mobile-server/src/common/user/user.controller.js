import BaseResponse from '../utils/base-response';
import userService from './user.service';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await userService.findWithPagination({
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
        const result = await userService.findOne({ _id: id }, select);
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    }
  },
  user: {
    async getMyInfo(req, res, next) {
      try {
        const user = req.user;
        return new BaseResponse({
          statusCode: 400,
          data: user
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async updateInfo(req, res, next) {
      try {
      } catch (error) {
        next(error);
      }
    }
  }
};
