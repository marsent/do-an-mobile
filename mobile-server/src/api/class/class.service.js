import BaseError from '../../common/utils/base-error';
import { errorCode } from '../../common/utils/error-code';
import extendService from '../../common/utils/extend-service';
import { ClassStatus } from './class.config';
import classModel from './class.model';

export default {
  ...extendService(classModel),
  async findActive({ select, options, ...query }) {
    const result = await classModel.findOne(
      { ...query, status: ClassStatus.Active },
      select,
      options
    );
    if (!result) {
      throw new BaseError({
        statusCode: 404,
        error: errorCode.client,
        errors: {
          class: errorCode['client.classNotFound']
        }
      });
    }
    return result;
  }
};
