import mongoose, { InferSchemaType, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    servingSize: {
      value: {
        type: Number,
        required: true,
        min: 0
      },
      unit: {
        type: String,
        required: true
      }
    },
    cookingTimeMinute: {
      type: Number,
      required: true,
      min: 0
    },
    ingredients: [
      {
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: 'Ingredient',
          required: true
        },
        quantity: [
          {
            value: {
              type: Number,
              required: true
            },
            unit: {
              type: String,
              required: true
            }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
);

dishSchema.plugin(mongoosePaginate);

export type Dish = InferSchemaType<typeof dishSchema>;

export const DishModel = mongoose.model<Dish>('Dish', dishSchema);
