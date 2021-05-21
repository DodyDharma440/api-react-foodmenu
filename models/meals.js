import mongoose from "mongoose";

const mealsSchema = mongoose.Schema({
  creator: {
    type: String,
    required: true,
  },
  idMeal: {
    type: String,
    required: true,
  },
  strMeal: {
    type: String,
    required: true,
  },
  strMealThumb: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export default mongoose.model("Meals", mealsSchema);
