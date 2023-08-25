import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from "../models/user.js";
import { emailIsAlreadyUsed, invalidUserSigninCredentials } from "../consts/errorMessages.js";
import { CREATED, OK } from '../consts/statuses.js';

import UnauthorizedError from '../errors/UnauthorizedError.js';
import ConflictError from '../errors/ConflictError.js';
import e from 'express';

const { NODE_ENV, TOKEN_KEY } = process.env;

export const register = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  const hash = await bcrypt.hash(password, 6);

  const newUser = new User({
    name, email, password: hash,
  });

  newUser.save()
    .then((user) => {
      const { password: _, ...userWithoutPassword } = user._doc;
      res.status(CREATED).send(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(emailIsAlreadyUsed));
        return;
      }

      next(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(invalidUserSigninCredentials);
      }

      bcrypt.compare(password, user.password, (err, matched) => {
        if (err) {
          next(err);
          return;
        }

        if (!matched) {
          throw new UnauthorizedError(invalidUserSigninCredentials);
        }

        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? TOKEN_KEY : '4a952aade591adfb64a57f228cb6c039', {
          expiresIn: '7d',
        });

        res.cookie('token', token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        res.status(OK).send({ token });
      });
    })
    .catch(next);
};

export function signout(req, res, next) {
  res.cookie('token', '', {
    maxAge: 0,
  });

  res.status(OK).send({});
}
