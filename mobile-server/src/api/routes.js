import { Router } from 'express';
import { classRouter } from './class/class.router';
import { lectureRouter } from './lecture/lecture.router';
import { studentRouter } from './student/student.router';
import { examRouter } from './exam/exam.router';
import { answerRouter } from './answer/answer.router';
import { subjectRouter } from './subject/subject.router';
import { scheduleRouter } from './schedule/schedule.router';

const routes = Router();

routes.use('/student', studentRouter);
routes.use('/lecture', lectureRouter);
routes.use('/class', classRouter);
routes.use('/exam', examRouter);
routes.use('/answer', answerRouter);
routes.use('/subject', subjectRouter);
routes.use('/schedule', scheduleRouter);

export default routes;
