import { model, Schema } from 'mongoose';
import { Faculty } from '../lecture/lecture.config';
import { ClassStatus } from './class.config';

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    faculty: {
      type: String,
      required: true,
      enum: Object.values(Faculty)
    },
    status: {
      type: String,
      default: ClassStatus.Active,
      enum: Object.values(ClassStatus)
    }
  },
  {
    timestamps: true
  }
);

export default model('class', classSchema);
