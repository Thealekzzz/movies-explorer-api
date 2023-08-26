import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';

configDotenv();

const { DATA_BASE_NAME } = process.env;

mongoose.connect(`mongodb://localhost:27017/${DATA_BASE_NAME || 'bitfilmsdb'}`, { useNewUrlParser: true });

export const app = express();

app.use(cookieParser());
app.use(express.json());
