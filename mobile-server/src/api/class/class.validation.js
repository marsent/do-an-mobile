import Joi from '@hapi/joi';
import { Faculty } from '../lecture/lecture.config';
import { ClassStatus } from './class.config';

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
        year: Joi.number(),
        faculty: Joi.string().valid(Object.values(Faculty))
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
    },
    create: {
      body: {
        name: Joi.string().min(3).required().trim(),
        year: Joi.number().min(2020).required(),
        faculty: Joi.string().valid(Object.values(Faculty)).required()
      }
    },
    update: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        name: Joi.string().min(3),
        year: Joi.number().min(2020),
        faculty: Joi.string().valid(Object.values(Faculty)),
        status: Joi.string().valid(Object.values(ClassStatus))
      }
    }
  }
};
