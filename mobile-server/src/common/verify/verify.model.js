import { Schema, model } from 'mongoose';

const verifyModel = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    creat_time: {
      type: Date,
      default: Date.now,
      expires: 10 * 60
    }
  },
  {
    timestamps: true
  }
);

export default model('verify', verifyModel);
