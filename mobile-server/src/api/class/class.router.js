import { Router } from 'express';
import { isAdmin } from '../../common/middlewares/auth-middleware';
import classValidation from './class.validation';
import classController from './class.controller';
import { validate } from '../../common/middlewares/validator';

const router = Router(),
  admin = Router();

admin.get('/', validate(classValidation.admin.get), classController.admin.get);
admin.get('/:id', validate(classValidation.admin.getById), classController.admin.getById);
admin.post('/', validate(classValidation.admin.create), classController.admin.create);
admin.put('/:id', validate(classValidation.admin.update), classController.admin.update);

router.use('/admin', isAdmin, admin);

export { router as classRouter };
