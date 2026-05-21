import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    sex: { type: String, required: true },
    dob: { type: Date, required: true },
    heightCm: { type: Number, required: true },
    activityLevel: { type: Number, required: true },
    exerciseFrequency: { type: Number, required: true },
    targetWeightKg: { type: Number, required: true },
    rateOfChangeKgPerWeek: { type: Number, required: true },
    diet: { type: String, required: true },
    proteinIntakeGPerKg: { type: Number, required: true },
    tdee: { type: Number, required: true },
    targetIntake: { type: Number, required: true },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(mongoosePaginate);

export type User = mongoose.InferSchemaType<typeof userSchema>;

export const UserModel = mongoose.model<User>('User', userSchema);
