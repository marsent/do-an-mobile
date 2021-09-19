import { model, Schema } from 'mongoose';
import { Faculty } from './lecture.config';
import { LectureStatus } from './lecture.config';

const lectureSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true
    },
    phone: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: LectureStatus.Active
    },
    decrypt_pass: {
      type: String,
      required: true
    },
    faculty: {
      type: String,
      required: true,
      enum: Object.values(Faculty)
    }
  },
  {
    timestamps: true
  }
);

export default model('lecture', lectureSchema);
