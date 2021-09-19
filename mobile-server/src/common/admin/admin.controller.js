import BaseResponse from '../utils/base-response';
import adminService from './admin.service';
import bcrypt from 'bcrypt';
import { errorCode } from '../utils/error-code';
import BaseError from '../utils/base-error';
import hashPassword from '../utils/hash-password';

export default {
  admin: {
    async get(req, res, next) {
      try {
        const { _id } = req.admin;
        const result = await adminService.findById(_id);
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
        const { _id } = req.admin;
        const result = await adminService.findOneAndUpdate({ _id }, req.body);
        return new BaseResponse({
          statusCode: 200,
          data: result
        }).return(res);
      } catch (error) {
        next(error);
      }
    },
    async updatePassword(req, res, next) {
      try {
        const { _id } = req.admin;
        const { old_password, new_password } = req.body;
        const admin = await adminService.findById(_id);
        const validPassword = await bcrypt.compare(old_password, admin.password);
        if (!validPassword) {
          throw new BaseError({
            statusCode: 400,
            error: errorCode.client,
            errors: {
              password: errorCode['client.invalidPassword']
            }
          });
        }

        const password = await hashPassword(new_password);
        admin.password = password;
        const result = await admin.save({ select: ' -password' });
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
