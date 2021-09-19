import Joi from '@hapi/joi';
import { ExamFor, ExamStatus, ExamTypes, ObjectCreateExam } from './exam.config';

const question = {
  question: Joi.string().required(),
  selection: Joi.array().items(Joi.string()).required().min(2),
  answer: Joi.string().valid(Joi.ref('selection')).required()
};

export default {
  admin: {
    get: {
      query: {
        limit: Joi.number().min(0).max(50),
        page: Joi.number().min(1),
        select: Joi.string(),
        sort: Joi.string(),
        created_by: Joi.string().valid(Object.values(ObjectCreateExam)),
        for: Joi.string().valid(Object.values(ExamFor)),
        class_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
        time: Joi.number().min(5),
        year: Joi.number().min(2020),
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
    create: {
      body: {
        name: Joi.string().required().min(5),
        for: Joi.string().valid(Object.values(ExamFor)).required(),
        class_id: Joi.when('for', {
          is: ExamFor.Class,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        student_ids: Joi.when('for', {
          is: ExamFor.Group,
          then: Joi.array()
            .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }))
            .unique()
            .min(1)
            .required(),
          otherwise: Joi.forbidden()
        }),
        subject_id: Joi.when('for', {
          is: ExamFor.Subject,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        questions: Joi.array().items(question).unique().min(1).required(),
        year: Joi.number().min(2020).required(),
        time: Joi.number().min(5).required(),
        start_at: Joi.date().iso().required().greater('now'),
        expire_at: Joi.date().iso().required().greater(Joi.ref('start_at')),
        type: Joi.string().valid(Object.values(ExamTypes)).required()
      }
    },
    update: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        questions: Joi.array().items(question).unique().min(1),
        year: Joi.number().min(2020),
        time: Joi.number().min(5),
        for: Joi.string().valid(Object.values(ExamFor)),
        class_id: Joi.when('for', {
          is: ExamFor.Class,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        student_ids: Joi.when('for', {
          is: ExamFor.Group,
          then: Joi.array()
            .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }))
            .unique()
            .min(1)
            .required(),
          otherwise: Joi.forbidden()
        }),
        subject_id: Joi.when('for', {
          is: ExamFor.Subject,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        name: Joi.string().min(5),
        start_at: Joi.date().iso().greater('now'),
        expire_at: Joi.when('start_at', {
          is: Joi.exist(),
          then: Joi.date().iso().required().greater(Joi.ref('start_at')),
          otherwise: Joi.forbidden()
        }),
        type: Joi.string().valid(Object.values(ExamTypes))
      }
    },
    updateStatus: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        status: Joi.string().valid(Object.values(ExamStatus)).required()
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
        for: Joi.string().valid(Object.values(ExamFor)),
        class_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }),
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
    create: {
      body: {
        name: Joi.string().required().min(5),
        for: Joi.string().valid(Object.values(ExamFor)).required(),
        class_id: Joi.when('for', {
          is: ExamFor.Class,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        student_ids: Joi.when('for', {
          is: ExamFor.Group,
          then: Joi.array()
            .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }))
            .unique()
            .min(1)
            .required(),
          otherwise: Joi.forbidden()
        }),
        subject_id: Joi.when('for', {
          is: ExamFor.Subject,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        questions: Joi.array().items(question).unique().min(1).required(),
        year: Joi.number().min(2020).required(),
        time: Joi.number().min(5).required(),
        start_at: Joi.date().iso().required().greater('now'),
        expire_at: Joi.date().iso().required().greater(Joi.ref('start_at')),
        type: Joi.string().valid(Object.values(ExamTypes)).required()
      }
    },
    update: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        questions: Joi.array().items(question).unique().min(1),
        year: Joi.number().min(2020),
        time: Joi.number().min(5),
        for: Joi.string().valid(Object.values(ExamFor)),
        class_id: Joi.when('for', {
          is: ExamFor.Class,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        student_ids: Joi.when('for', {
          is: ExamFor.Group,
          then: Joi.array()
            .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' }))
            .unique()
            .min(1)
            .required(),
          otherwise: Joi.forbidden()
        }),
        subject_id: Joi.when('for', {
          is: ExamFor.Subject,
          then: Joi.string()
            .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
            .required(),
          otherwise: Joi.forbidden()
        }),
        name: Joi.string().min(5),
        start_at: Joi.date().iso().greater('now'),
        expire_at: Joi.when('start_at', {
          is: Joi.exist(),
          then: Joi.date().iso().required().greater(Joi.ref('start_at')),
          otherwise: Joi.forbidden()
        }),
        type: Joi.string().valid(Object.values(ExamTypes))
      }
    },
    updateStatus: {
      params: {
        id: Joi.string()
          .regex(/^[0-9a-fA-F]{24}$/, { name: 'object id' })
          .required()
      },
      body: {
        status: Joi.string().valid(Object.values(ExamStatus)).required()
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
        time: Joi.number().min(5),
        for: Joi.string().valid(Object.values(ExamFor)),
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
    search: {
      query: {
        name: Joi.string().required().allow('').trim(),
        limit: Joi.number().min(1).optional(),
        page: Joi.number().min(1).optional()
      }
    }
  }
};
