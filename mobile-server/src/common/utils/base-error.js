import { invert } from 'lodash';
import { errorCode } from './error-code';

const invertedErrorCode = invert(errorCode);

class BaseError extends Error {
  constructor({ statusCode, errors = {}, error, message = '' }) {
    super();
    this.statusCode = statusCode;
    this.error = error;
    this.errors = errors;
    this.message = message;
    !this.message &&
      (this.message =
        (errors &&
          !isNaN(Object.values(errors)[0]) &&
          invertedErrorCode[Object.values(errors)[0]]) ||
        '');
  }

  addMeta(meta) {
    Object.assign(this, meta);
    return this;
  }

  return(res) {
    return res.status(this.statusCode).json(this);
  }
}
export default BaseError;
