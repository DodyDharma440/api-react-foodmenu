import Meals from "../models/meals.js";

export const getFavMeals = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({
      message: "Authentication needed",
    });
  }

  try {
    const meals = await Meals.find({ creator: req.userId }).exec();
    res.status(200).json({ meals });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const addFavMeals = async (req, res) => {
  const meal = req.body;

  if (!req.userId) {
    return res.status(401).json({
      message: "Authentication needed",
    });
  }

  const isFavourited = await Meals.findOne({ idMeal: meal.idMeal });

  if (isFavourited) {
    return res.status(409).json({
      message: "This meal is currently favourited.",
    });
  }

  const newData = new Meals({
    ...meal,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newData.save();
    res.status(201).json({
      message: "Success to add new favourite.",
      newData,
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

export const removeFavMeals = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      message: "Authentication needed",
    });
  }

  if (!id) {
    return res.status(401).json({
      message: "params id is not defined",
    });
  }

  const isFavourited = await Meals.findOne({ _id: id });

  if (!isFavourited) {
    return res.status(404).json({
      message: "Meal with this id is not found",
    });
  }

  try {
    await Meals.findByIdAndRemove(id);
    res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
