import { model, Schema } from 'mongoose';
import { AnswerStatus } from './answer.config';

const answerSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    exam_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    subject_id: {
      type: Schema.Types.ObjectId,
      index: true
    },
    answer: {
      type: [String],
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: AnswerStatus.Active
    },
    finish_time: {
      type: Number,
      required: true
    },
    lecture_id: {
      type: Schema.Types.ObjectId,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

answerSchema.virtual('exam', {
  localField: 'exam_id',
  foreignField: '_id',
  ref: 'exam',
  justOne: true
});

answerSchema.virtual('student', {
  localField: 'student_id',
  foreignField: '_id',
  ref: 'student',
  justOne: true
});

export default model('answer', answerSchema);
