import Joi from '@hapi/joi';

export default {
  register: {
    body: {
      email: Joi.string().email().required(),
      phone: Joi.string().length(10).required(),
      password: Joi.string().min(8).required(),
      date_of_birth: Joi.date().iso().less('now').required(),
      full_name: Joi.string().min(5).required()
    }
  },
  signIn: {
    body: {
      phone: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  verify: {
    params: {
      user_id: Joi.string()
        .regex(/^[0-9a-zA-Z]{24}$/)
        .required()
    },
    body: {
      code: Joi.string().required()
    }
  }
};
