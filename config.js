import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { configDotenv } from 'dotenv';

import checkCors from './middlewares/checkCors.js';

configDotenv();

const { NODE_ENV, DATA_BASE_NAME } = process.env;

mongoose.connect(
  `mongodb://localhost:27017/${NODE_ENV === 'production' ? DATA_BASE_NAME : 'bitfilmsdb'}`,
  { useNewUrlParser: true }
);

export const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(checkCors);
app.use(helmet());
