import { Promise } from 'bluebird';
import BaseError from '../../common/utils/base-error';
import { errorCode } from '../../common/utils/error-code';
import extendService from '../../common/utils/extend-service';
import { StudentStatus } from './student.config';
import studentModel from './student.model';

export default {
  ...extendService(studentModel),
  async findActive({ select, options, ...query }) {
    const result = await studentModel.findOne(
      { ...query, status: StudentStatus.Active },
      select,
      options
    );
    if (!result) {
      throw new BaseError({
        statusCode: 404,
        error: errorCode.client,
        errors: {
          class: errorCode['client.studentNotFound']
        }
      });
    }
    return result;
  },
  async checkStudentActive(student_ids) {
    await Promise.map(student_ids, async (student_id) => {
      const student = await this.findActive({ _id: student_id });
      return student;
    });
  }
};
