import { model, Schema } from 'mongoose';
import { Faculty } from '../lecture/lecture.config';
import { subjectStatuses, weekDays } from './subject.config';

const scheduleSchema = new Schema({
  weekday: {
    type: String,
    required: true,
    enum: Object.values(weekDays)
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
  }
});

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    subject_code: {
      type: String,
      required: true
    },
    lecture_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    },
    schedule: {
      type: [scheduleSchema],
      required: true
    },
    faculty: {
      type: String,
      required: true,
      enum: Object.values(Faculty)
    },
    status: {
      type: String,
      enum: Object.values(subjectStatuses),
      default: subjectStatuses.Active
    },
    register_at: {
      type: Date,
      required: true
    },
    end_register_at: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

subjectSchema.virtual('lecture', {
  ref: 'lecture',
  localField: 'lecture_id',
  foreignField: '_id',
  justOne: true
});

export default model('subject', subjectSchema);
