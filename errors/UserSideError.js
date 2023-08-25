import { USER_SIDE_ERROR } from '../consts/statuses.js';

class UserSideError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = USER_SIDE_ERROR;
  }
}

export default UserSideError;
