import { model, Schema } from 'mongoose';
import { weekDays } from '../subject/subject.config';

const scheduleDetailSchema = new Schema({
  weekday: {
    type: String,
    required: true,
    enum: Object.values(weekDays)
  },
  details: [
    {
      subject_id: {
        type: Schema.Types.ObjectId,
        required: true
      },
      from: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      to: {
        type: Number,
        min: 0,
        max: 23,
        required: true
      },
      subject_name: {
        type: String,
        required: true
      },
      lecture_name: {
        type: String,
        required: true
      }
    }
  ]
});

const scheduleSchema = new Schema(
  {
    student_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    schedule: {
      type: [scheduleDetailSchema],
      required: true
    },
    subject_ids: {
      type: [Schema.Types.ObjectId],
      default: []
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

scheduleSchema.virtual('student', {
  ref: 'student',
  localField: 'student_id',
  foreignField: '_id',
  justOne: true
});

export default model('schedule', scheduleSchema);
