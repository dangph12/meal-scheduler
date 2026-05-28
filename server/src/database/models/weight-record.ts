import mongoose, { InferSchemaType, PaginateModel, Schema } from 'mongoose';
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

weightRecordSchema.index({ userId: 1, createdAt: -1 });
weightRecordSchema.plugin(mongoosePaginate);

export type WeightRecord = InferSchemaType<typeof weightRecordSchema>;

export const WeightRecordModel = mongoose.model<
  WeightRecord,
  PaginateModel<WeightRecord>
>('WeightRecord', weightRecordSchema);
