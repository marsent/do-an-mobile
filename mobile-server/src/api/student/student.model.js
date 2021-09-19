import { model, Schema } from 'mongoose';
import { StudentStatus } from './student.config';

const studentSchema = new Schema(
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
    is_verified: {
      type: Boolean,
      required: true,
      default: false
    },
    status: {
      type: String,
      default: StudentStatus.Active
    },
    decrypt_pass: {
      type: String,
      required: true
    },
    student_code: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    class_id: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

studentSchema.virtual('class', {
  localField: 'class_id',
  foreignField: '_id',
  ref: 'class',
  justOne: true
});

export default model('student', studentSchema);
