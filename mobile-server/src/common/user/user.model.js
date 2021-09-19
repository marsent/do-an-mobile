import { Schema, model } from 'mongoose';
import { UserStatuses } from './user.config';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
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
      default: UserStatuses.Active
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default model('user', userSchema);
