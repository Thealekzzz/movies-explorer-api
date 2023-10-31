import { USER_NOT_FOUND } from '../consts/errorMessages.js';
import { OK } from '../consts/statuses.js';
import NotFoundError from '../errors/NotFoundError.js';
import User from '../models/user.js';

export function getMe(req, res, next) {
  const { _id: userId } = req.user;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }

      res.status(OK).send(user);
    })
    .catch(next);
}

export function patchMe(req, res, next) {
  const { _id: userId } = req.user;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }

      res.status(OK).send(user);
    })
    .catch(next);
}
