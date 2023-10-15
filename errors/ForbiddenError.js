import { FORBIDDEN_ERROR } from '../consts/statuses.js';

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
  }
}

export default ForbiddenError;
