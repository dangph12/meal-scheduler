import mongoose, { InferSchemaType, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const nutrientValueSchema = new Schema(
  {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    refusePercentage: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 100
    },
    imageUrl: {
      type: String
    },
    // All nutrient values are per 100g of edible portion
    proximate: {
      water: nutrientValueSchema,
      energy: [nutrientValueSchema],
      protein: nutrientValueSchema,
      fat: nutrientValueSchema,
      carbohydrate: nutrientValueSchema,
      fiber: nutrientValueSchema,
      ash: nutrientValueSchema
    },
    sugar: {
      galactose: nutrientValueSchema,
      maltose: nutrientValueSchema,
      lactose: nutrientValueSchema,
      fructose: nutrientValueSchema,
      glucose: nutrientValueSchema,
      sucrose: nutrientValueSchema
    },
    mineral: {
      calcium: nutrientValueSchema,
      iron: nutrientValueSchema,
      magnesium: nutrientValueSchema,
      manganese: nutrientValueSchema,
      phosphorus: nutrientValueSchema,
      potassium: nutrientValueSchema,
      sodium: nutrientValueSchema,
      zinc: nutrientValueSchema,
      copper: nutrientValueSchema,
      selenium: nutrientValueSchema
    },
    vitamin: {
      waterSoluble: {
        c: nutrientValueSchema,
        b1: nutrientValueSchema,
        b2: nutrientValueSchema,
        pp: nutrientValueSchema,
        b5: nutrientValueSchema,
        b6: nutrientValueSchema,
        folat: nutrientValueSchema,
        b9: nutrientValueSchema,
        h: nutrientValueSchema,
        b12: nutrientValueSchema
      },
      fatSoluble: {
        a: nutrientValueSchema,
        d: nutrientValueSchema,
        e: nutrientValueSchema,
        k: nutrientValueSchema
      }
    },
    carotenoid: {
      betaCaroten: nutrientValueSchema,
      alphaCaroten: nutrientValueSchema,
      betaCryptoxanthin: nutrientValueSchema,
      lycopen: nutrientValueSchema,
      luteinZeaxanthin: nutrientValueSchema
    },
    purin: nutrientValueSchema,
    isoflavone: {
      daidzein: nutrientValueSchema,
      genistein: nutrientValueSchema,
      glycitein: nutrientValueSchema
    },
    fattyAcid: {
      saturated: {
        palmitic: nutrientValueSchema,
        margaric: nutrientValueSchema,
        stearic: nutrientValueSchema,
        arachidic: nutrientValueSchema,
        behenic: nutrientValueSchema,
        lignoceric: nutrientValueSchema
      },
      monounsaturated: {
        myristoleic: nutrientValueSchema,
        palmitoleic: nutrientValueSchema,
        oleic: nutrientValueSchema
      },
      polyunsaturated: {
        linoleic: nutrientValueSchema,
        linolenic: nutrientValueSchema,
        arachidonic: nutrientValueSchema,
        eicosapentaenoic: nutrientValueSchema,
        docosahexaenoic: nutrientValueSchema
      },
      trans: nutrientValueSchema
    },
    cholesterol: nutrientValueSchema,
    phytosterol: nutrientValueSchema,
    aminoAcid: {
      lysin: nutrientValueSchema,
      methionin: nutrientValueSchema,
      tryptophan: nutrientValueSchema,
      phenylalanin: nutrientValueSchema,
      threonin: nutrientValueSchema,
      valin: nutrientValueSchema,
      leucin: nutrientValueSchema,
      isoleucin: nutrientValueSchema,
      arginin: nutrientValueSchema,
      histidin: nutrientValueSchema,
      cystin: nutrientValueSchema,
      tyrosin: nutrientValueSchema,
      alanin: nutrientValueSchema,
      acidAspartic: nutrientValueSchema,
      acidGlutamic: nutrientValueSchema,
      glycin: nutrientValueSchema,
      prolin: nutrientValueSchema,
      serin: nutrientValueSchema
    }
  },
  {
    timestamps: true
  }
);

ingredientSchema.plugin(mongoosePaginate);

export type Ingredient = InferSchemaType<typeof ingredientSchema>;

export const IngredientModel = mongoose.model<Ingredient>(
  'Ingredient',
  ingredientSchema
);
