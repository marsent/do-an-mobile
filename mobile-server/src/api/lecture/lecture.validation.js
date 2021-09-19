import Joi from '@hapi/joi';
import { Faculty, LectureStatus } from './lecture.config';

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
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
        email: Joi.string().email().required(),
        phone: Joi.string().length(10).required(),
        full_name: Joi.string().min(3).required(),
        date_of_birth: Joi.date().iso().required().less('now'),
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
        status: Joi.string().valid(Object.values(LectureStatus)),
        password: Joi.boolean(),
        faculty: Joi.string().valid(Object.values(Faculty))
      }
    }
  },
  lecture: {
    update: {
      body: {
        password: Joi.string().min(10),
        email: Joi.string().email()
      }
    }
  }
};
