import express from "express";
import { signUp, signIn, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.delete("/:id", deleteUser);

export default router;
