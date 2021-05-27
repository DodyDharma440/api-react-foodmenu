import Ingredients from "../models/ingredients.js";

const handleUnauth = () => {
  return res.status(401).json({
    message: "Authentication needed",
  });
};

export const getFavIngredients = async (req, res) => {
  if (!req.userId) {
    handleUnauth();
  }

  try {
    const ingredients = await Ingredients.find({ creator: req.userId }).exec();
    res.status(200).json({ ingredients });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export const addFavIngredients = async (req, res) => {
  const ingredient = req.body;

  if (!req.userId) {
    handleUnauth();
  }

  const isFavourited = await Ingredients.findOne({
    idIngredient: ingredient.idIngredient,
  });

  if (isFavourited) {
    return res.status(409).json({
      message: "This ingredient is currently favourited.",
    });
  }

  const newData = new Ingredients({
    ...ingredient,
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

export const removeFavIngredients = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    handleUnauth();
  }

  if (!id) {
    return res.status(401).json({
      message: "params id is not defined",
    });
  }

  const isFavourited = await Ingredients.findOne({ _id: id });

  if (!isFavourited) {
    return res.status(404).json({
      message: "Ingredient with this id is not found",
    });
  }

  try {
    await Ingredients.findByIdAndRemove(id);
    res.status(200).json({
      message: "Delete success",
    });
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};
