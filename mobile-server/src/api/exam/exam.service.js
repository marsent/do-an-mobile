import BaseError from '../../common/utils/base-error';
import { errorCode } from '../../common/utils/error-code';
import extendService from '../../common/utils/extend-service';
import examModel from './exam.model';

export default {
  ...extendService(examModel),
  async findEnsure({ select, options, ...query }) {
    const exam = await this.findOne(query, select, options);
    if (!exam) {
      throw new BaseError({
        statusCode: 404,
        error: errorCode.client,
        errors: {
          exam: errorCode['client.examNotFound']
        }
      });
    }
    return exam;
  }
};
