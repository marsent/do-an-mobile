import Joi from '@hapi/joi';
import { StudentStatus } from './student.config';

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
        year: Joi.number().min(2020),
        class_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
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
        year: Joi.number().required().min(2020),
        class_id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      }
    },
    update: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        status: Joi.string().valid(Object.values(StudentStatus)),
        password: Joi.boolean(),
        class_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
      }
    },
    resetPassword: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      }
    }
  },
  student: {
    update: {
      body: {
        password: Joi.string().min(10),
        email: Joi.string().email()
      }
    }
  }
};
