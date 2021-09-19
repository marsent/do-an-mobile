import BaseError from '../../common/utils/base-error';
import { errorCode } from '../../common/utils/error-code';
import extendService from '../../common/utils/extend-service';
import subjectModel from './subject.model';

export default {
  ...extendService(subjectModel),
  async findEnsure({ select, options = {}, ...query }) {
    const subject = await subjectModel.findOne(query, select, options);
    if (!subject) {
      throw new BaseError({
        statusCode: 404,
        error: errorCode.client,
        errors: {
          subject: errorCode['client.subjectNotFound']
        }
      });
    }
    return subject;
  }
};
