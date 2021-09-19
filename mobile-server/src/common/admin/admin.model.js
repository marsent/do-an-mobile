import { Schema, model } from 'mongoose';

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: Date,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'active'
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default model('admin', adminSchema);
