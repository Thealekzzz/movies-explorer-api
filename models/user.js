import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный Email',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minLength: [2, 'Минимальная длина имени - 2 символа'],
      maxLength: [30, 'Максимальная длина имени - 30 символов'],
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model('User', userSchema);
