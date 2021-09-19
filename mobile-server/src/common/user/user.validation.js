import Joi from '@hapi/joi';
import { UserStatuses } from './user.config';

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
        status: Joi.string().valid(Object.values(UserStatuses))
      }
    },
    getById: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      query: {
        select: Joi.string()
      }
    }
  },
  user: {
    getInfo: {
      query: {
        select: Joi.string()
      }
    },
    updateInfo: {
      password: Joi.string().min(5),
      email: Joi.string().email()
    }
  }
};
