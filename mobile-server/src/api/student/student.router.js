import { Router } from 'express';
import { isAdmin, isStudent } from '../../common/middlewares/auth-middleware';
import { validate } from '../../common/middlewares/validator';
import studentValidation from './student.validation';
import studentController from './student.controller';

const admin = Router(),
  student = Router(),
  router = Router();

admin.get('/', validate(studentValidation.admin.get), studentController.admin.get);
admin.get('/:id', validate(studentValidation.admin.getById), studentController.admin.getById);
admin.post('/', validate(studentValidation.admin.create), studentController.admin.create);
admin.put('/:id', validate(studentValidation.admin.update), studentController.admin.update);
admin.get(
  '/reset-pass/:id',
  validate(studentValidation.admin.resetPassword),
  studentController.admin.resetPassword
);

student.get('/', studentController.student.get);
student.put('/', validate(studentValidation.student.update), studentController.student.update);

router.use('/admin', isAdmin, admin);
router.use('/', isStudent, student);

export { router as studentRouter };
