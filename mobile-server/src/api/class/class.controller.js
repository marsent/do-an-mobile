import { Promise } from 'bluebird';
import BaseError from '../../common/utils/base-error';
import BaseResponse from '../../common/utils/base-response';
import { errorCode } from '../../common/utils/error-code';
import { ClassStatus } from './class.config';
import classService from './class.service';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { limit, page, select, sort, ...query } = req.query;
        const [result, { total_page, total }] = await classService.findWithPagination({
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
        const result = await classService.findOne({ _id: id }, select);
        return new BaseResponse({ statusCode: 200, data: result }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async create(req, res, next) {
      try {
        const { name } = req.body;
        const existedClass = await classService.findOne({ name, status: ClassStatus.Active });
        if (existedClass) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              class: errorCode['client.classExisted']
            }
          });
        }
        const result = await classService.create(req.body);
        return new BaseResponse({
          statusCode: 400,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async update(req, res, next) {
      try {
        const { id } = req.params;
        const { name } = req.body;
        const update = req.body;
        const [existedClass, sameClass] = await Promise.all([
          classService.findById(id),
          classService.findOne({ name, status: ClassStatus.Active })
        ]);
        if (!existedClass) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              class: errorCode['client.classNotFound']
            }
          });
        }
        if (sameClass && existedClass.status === ClassStatus.Active) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              class: errorCode['client.classExisted']
            }
          });
        }
        const result = await classService.findOneAndUpdate({ _id: id }, update, { new: true });
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
