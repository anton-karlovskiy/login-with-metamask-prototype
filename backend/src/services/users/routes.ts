
import express from 'express';
import jwt from 'express-jwt';

import { JWT_SETTING } from '../../config';
import * as controller from './controller';

export const userRouter = express.Router();

/** GET /api/users */
userRouter.route('/').get(controller.find);

/** GET /api/users/:userId */
/** Authenticated route */
userRouter.route('/:userId').get(jwt(JWT_SETTING), controller.get);

/** POST /api/users */
userRouter.route('/').post(controller.create);

/** PATCH /api/users/:userId */
/** Authenticated route */
userRouter.route('/:userId').patch(jwt(JWT_SETTING), controller.patch);
