import Joi from '@hapi/joi';
import { Faculty } from '../lecture/lecture.config';
import { weekDays } from './subject.config';

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
        faculty: Joi.string().valid(Object.values(Faculty)),
        lecture_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
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
        faculty: Joi.string().valid(Object.values(Faculty)).required(),
        subject_code: Joi.string().required().min(5),
        schedule: Joi.array().items({
          weekday: Joi.string().valid(Object.values(weekDays)).required(),
          from: Joi.number().min(0).max(23).required(),
          to: Joi.number().greater(Joi.ref('from')).min(0).max(23).required()
        }),
        lecture_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
        register_at: Joi.date().iso().greater('now').required(),
        end_register_at: Joi.date().iso().greater(Joi.ref('register_at')).required()
      }
    },
    update: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        name: Joi.string().min(3).trim(),
        faculty: Joi.string().valid(Object.values(Faculty)),
        subject_code: Joi.string().min(5),
        schedule: Joi.array().items({
          weekday: Joi.string().valid(Object.values(weekDays)).required(),
          from: Joi.number().min(0).max(23).required(),
          to: Joi.number().greater(Joi.ref('from')).min(0).max(23).required()
        }),
        lecture_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
        register_at: Joi.date().iso().greater('now'),
        end_register_at: Joi.when('register_at', {
          is: Joi.exist(),
          then: Joi.date().iso().greater(Joi.ref('register_at')).required(),
          otherwise: Joi.forbidden()
        })
      }
    }
  },
  lecture: {
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
    }
  },
  student: {
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
    register: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      }
    },
    cancel: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      }
    }
  }
};
