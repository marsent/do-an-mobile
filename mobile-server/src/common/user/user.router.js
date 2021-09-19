import { Router } from 'express';
import { validate } from '../middlewares/validator';
import userController from './user.controller';
import userValidation from './user.validation';
import { isUser } from '../middlewares/auth-middleware';

const router = Router(),
  admin = Router(),
  user = Router();

admin.get('/', validate(userValidation.admin.get), userController.admin.get);
admin.get('/:id', validate(userValidation.admin.getById), userController.admin.getById);

user.get('/me', validate(userValidation.user.getInfo), userController.user.getMyInfo);
user.put('/', validate(userValidation.user.updateInfo), userController.user.updateInfo);

router.use('/', isUser, user);

export { router as userRouter };
