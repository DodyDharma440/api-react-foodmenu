import mongoose from "mongoose";

const ingredientsSchema = mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  idIngredient: {
    type: String,
    required: true,
  },
  strIngredient: {
    type: String,
    required: true,
  },
  strDescription: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Ingredients", ingredientsSchema);
