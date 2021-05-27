import express from "express";
import {
  getFavMeals,
  addFavMeals,
  removeFavMeals,
} from "../controllers/meals.js";
import {
  getFavIngredients,
  addFavIngredients,
  removeFavIngredients,
} from "../controllers/ingredients.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/meals", auth, getFavMeals);
router.post("/meals", auth, addFavMeals);
router.delete("/meals/:id", auth, removeFavMeals);

router.get("/ingredients", auth, getFavIngredients);
router.post("/ingredients", auth, addFavIngredients);
router.delete("/ingredients/:id", auth, removeFavIngredients);

export default router;
