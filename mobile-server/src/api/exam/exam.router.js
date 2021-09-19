import { Router } from 'express';

import { isAdmin, isLecture, isStudent } from '../../common/middlewares/auth-middleware';
import { validate } from '../../common/middlewares/validator';
import examController from './exam.controller';
import examValidation from './exam.validation';

const admin = Router(),
  lecture = Router(),
  router = Router(),
  student = Router();

admin.get('/', validate(examValidation.admin.get), examController.admin.get);
admin.get('/:id', validate(examValidation.admin.getById), examController.admin.getById);
admin.post('/', validate(examValidation.admin.create), examController.admin.create);
admin.put('/:id', validate(examValidation.admin.update), examController.admin.update);
admin.put(
  '/status/:id',
  validate(examValidation.admin.updateStatus),
  examController.admin.updateStatus
);

lecture.get('/', validate(examValidation.lecture.get), examController.lecture.get);
lecture.get('/:id', validate(examValidation.lecture.getById), examController.lecture.getById);
lecture.post('/', validate(examValidation.lecture.create), examController.lecture.create);
lecture.put('/:id', validate(examValidation.lecture.update), examController.lecture.update);
lecture.put(
  '/status/:id',
  validate(examValidation.lecture.updateStatus),
  examController.lecture.updateStatus
);

student.get('/', validate(examValidation.student.get), examController.student.get);
student.get('/:id', validate(examValidation.student.getById), examController.student.getById);
student.get('/search', validate(examValidation.student.search), examController.student.search);

router.use('/admin', isAdmin, admin);
router.use('/lecture', isLecture, lecture);
router.use('/student', isStudent, student);

export { router as examRouter };
