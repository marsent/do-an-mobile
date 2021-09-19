import Joi from '@hapi/joi';
import { AnswerStatus } from './answer.config';

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
        class_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
        year: Joi.number().min(2020),
        time: Joi.number(),
        exam_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
        lecture_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
        subject_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
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
    updateStatus: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        status: Joi.string().valid(Object.values(AnswerStatus)).required()
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
        year: Joi.number().min(2020),
        time: Joi.number().min(5),
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
    updateStatus: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        status: Joi.string().valid(Object.values(AnswerStatus)).required()
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
        year: Joi.number().min(2020),
        time: Joi.number().min(5)
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
    submit: {
      body: {
        exam_id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required(),
        finish_time: Joi.number().required().min(5),
        answer: Joi.array().items(Joi.string()).min(1).required()
      }
    }
  }
};
