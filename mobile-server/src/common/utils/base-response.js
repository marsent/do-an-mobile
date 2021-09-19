class BaseResponse {
  constructor({ statusCode, data, message }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
  addMeta(meta) {
    return Object.assign(this, meta);
  }
  return(res) {
    return res.status(this.statusCode).json(this);
  }
}

export default BaseResponse;
