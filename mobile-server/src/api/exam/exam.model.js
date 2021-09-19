import { model, Schema } from 'mongoose';
import { ExamFor, ExamStatus, ExamTypes, ObjectCreateExam } from './exam.config';

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    selection: { type: [String], required: true },
    answer: { type: String, required: true }
  },
  { _id: false }
);

const examSchema = new Schema(
  {
    object_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'created_by'
    },
    created_by: {
      type: String,
      required: true,
      enum: Object.values(ObjectCreateExam)
    },
    name: {
      type: String,
      required: true,
      index: { text: true }
    },
    class_id: {
      type: Schema.Types.ObjectId,
      index: true
    },
    subject_id: {
      type: Schema.Types.ObjectId,
      index: true
    },
    for: {
      type: String,
      required: true,
      enum: Object.values(ExamFor)
    },
    student_ids: {
      type: [Schema.Types.ObjectId]
    },
    questions: [questionSchema],
    time: {
      type: Number,
      required: true,
      min: 5
    },
    year: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: ExamStatus.Active
    },
    start_at: {
      type: Date,
      required: true
    },
    expire_at: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      enum: Object.values(ExamTypes),
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default model('exam', examSchema);
