import express from "express";
import {
  getFavourites,
  addFavourites,
  removeFavourites,
} from "../controllers/meals.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/meals", auth, getFavourites);
router.post("/meals", auth, addFavourites);
router.delete("/meals/:id", auth, removeFavourites);

export default router;
