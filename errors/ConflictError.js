import { CONFLICT_ERROR } from '../consts/statuses.js';

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_ERROR;
  }
}

export default ConflictError;
