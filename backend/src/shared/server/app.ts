/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { createConnection } from '../database/connection';

import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

import routes from '../routes';

const app = express();

const server = new http.Server(app);
const io = new Server(server,{cors:{origin:'*'}});

io.on("connection", (socket) => {
  socket.on("sendCode",(codeProduct)=>{
    socket.broadcast.emit("responseCode",codeProduct);
  })
});

createConnection();
app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

export default server;
