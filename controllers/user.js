import { userNotFound } from '../consts/errorMessages.js';
import { OK } from '../consts/statuses.js';
import NotFoundError from '../errors/NotFoundError.js';
import User from '../models/user.js';

export function getUsers(req, res, next) {
  User.find()
  .then((users) => {
    res.status(OK).send(users);
  })
  .catch(next);
}

export function getMe(req, res, next) {
  const { _id: userId } = req.user;

  User.findById(userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError(userNotFound);
    }

    res.status(OK).send(user);
  })
  .catch(next);
}

export function patchMe(req, res, next) {
  const { _id: userId } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
  .then((user) => {
    if (!user) {
      throw new NotFoundError(userNotFound);
    }

    res.status(OK).send(user);
  })
  .catch(next);
}
