import { Router } from 'express';
import { isAdmin } from '../middlewares/auth-middleware';
import { validate } from '../middlewares/validator';
import adminController from './admin.controller';
import adminValidation from './admin.validation';

const router = Router(),
  admin = Router();

admin.get('/', adminController.admin.get);
admin.put('/', validate(adminValidation.admin.update), adminController.admin.update);
admin.put(
  '/password',
  validate(adminValidation.admin.updatePassword),
  adminController.admin.updatePassword
);

router.use('/', isAdmin, admin);

export { router as adminRouter };
