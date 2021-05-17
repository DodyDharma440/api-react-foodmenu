import express from "express";
import {
  signUp,
  signIn,
  editProfile,
  deleteUser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.patch("/edit-profile", auth, editProfile);
router.delete("/:id", auth, deleteUser);

export default router;
