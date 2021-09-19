import { customMorgan } from './common/utils/morgan-custom';
import cors from 'cors';
import bodyParser from 'body-parser';
import { catcher, handler } from './common/middlewares/error';
import { mainRouter } from './routes';
import mongoose from 'mongoose';
import { docsRouter } from './docs/index';
import databaseService from './common/database';
import { adminRouter } from './common/admin/admin.router';
var express = require('express');

const app = express();
app.use(cors());
app.use(customMorgan);

databaseService.connect();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/test', (req, res, next) => res.json('Testing api'));
app.use('/', mainRouter);
app.use('/docs', docsRouter);
app.use('/admin', adminRouter);

// error handler

app.use(catcher, handler);

module.exports = app;
