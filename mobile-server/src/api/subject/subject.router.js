import { Router } from 'express';
import { isAdmin, isLecture, isStudent } from '../../common/middlewares/auth-middleware';
import { validate } from '../../common/middlewares/validator';
import subjectController from './subject.controller';
import subjectValidation from './subject.validation';

const router = Router(),
  admin = Router(),
  lecture = Router(),
  student = Router();

admin.get('/', validate(subjectValidation.admin.get), subjectController.admin.get);
admin.get('/:id', validate(subjectValidation.admin.getById), subjectController.admin.getById);
admin.post('/', validate(subjectValidation.admin.create), subjectController.admin.create);
admin.put('/:id', validate(subjectValidation.admin.update), subjectController.admin.update);

lecture.get('/', validate(subjectValidation.lecture.get), subjectController.get);
lecture.get('/:id', validate(subjectValidation.lecture.getById), subjectController.getById);

student.get('/', validate(subjectValidation.student.get), subjectController.get);
student.get('/:id', validate(subjectValidation.student.getById), subjectController.getById);
student.get(
  '/register/:id',
  validate(subjectValidation.student.register),
  subjectController.student.register
);
student.get(
  '/cancel/:id',
  validate(subjectValidation.student.cancel),
  subjectController.student.cancel
);

router.use('/admin', isAdmin, admin);
router.use('/lecture', isLecture, lecture);
router.use('/student', isStudent, student);

export { router as subjectRouter };
