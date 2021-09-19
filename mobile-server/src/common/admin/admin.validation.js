import Joi from '@hapi/joi';

export default {
  admin: {
    update: {
      body: {
        name: Joi.string(),
        date_of_birth: Joi.date().iso(),
        email: Joi.string().email()
      }
    },
    updatePassword: {
      body: {
        old_password: Joi.string().required(),
        retype_password: Joi.string().valid(Joi.ref('new_password')).required(),
        new_password: Joi.string().min(5).required()
      }
    }
  }
};
