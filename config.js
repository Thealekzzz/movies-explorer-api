import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';

configDotenv();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });

export const app = express();

app.use(cookieParser());
app.use(express.json());
