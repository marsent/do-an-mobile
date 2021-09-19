import { Router } from 'express';

import { isAdmin, isLecture, isStudent } from '../../common/middlewares/auth-middleware';
import { validate } from '../../common/middlewares/validator';
import answerController from './answer.controller';
import answerValidation from './answer.validation';

const admin = Router(),
  lecture = Router(),
  router = Router(),
  student = Router();

admin.get('/', validate(answerValidation.admin.get), answerController.admin.get);
admin.get('/:id', validate(answerValidation.admin.getById), answerController.admin.getById);
admin.put(
  '/status/:id',
  validate(answerValidation.admin.updateStatus),
  answerController.admin.updateStatus
);

lecture.get('/', validate(answerValidation.lecture.get), answerController.lecture.get);
lecture.get('/:id', validate(answerValidation.lecture.getById), answerController.lecture.getById);
lecture.put(
  '/status/:id',
  validate(answerValidation.lecture.updateStatus),
  answerController.lecture.updateStatus
);

student.get('/', validate(answerValidation.student.get), answerController.student.get);
student.get('/:id', validate(answerValidation.student.getById), answerController.student.getById);
student.post('/submit', validate(answerValidation.student.submit), answerController.student.submit);

router.use('/admin', isAdmin, admin);
router.use('/lecture', isLecture, lecture);
router.use('/student', isStudent, student);

export { router as answerRouter };
