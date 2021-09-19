import BaseError from '../utils/base-error';
import { errorCode } from '../utils/error-code';

export const catcher = (req, res, next) => {
  next(
    new BaseError({ statusCode: 404, error: errorCode.server, errors: {}, message: 'Not Found' })
  );
};

export const handler = (error, req, res, next) => {
  if (error instanceof BaseError && error.statusCode) {
    console.log(error);
    res.status(error.statusCode).json(error);
  } else {
    console.log(error);
    res.status(500).json(
      new BaseError({
        statusCode: 500,
        error: errorCode.server,
        errors: error.stack,
        message: error.message
      })
    );
  }
};
