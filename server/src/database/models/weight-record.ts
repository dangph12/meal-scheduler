import mongoose, { InferSchemaType, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const weightRecordSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    weightKg: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

weightRecordSchema.plugin(mongoosePaginate);

export type WeightRecord = InferSchemaType<typeof weightRecordSchema>;

export const WeightRecordModel = mongoose.model<WeightRecord>(
  'WeightRecord',
  weightRecordSchema
);
