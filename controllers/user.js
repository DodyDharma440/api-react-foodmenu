import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "../models/user.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exist",
      });
    }

    const isPasswordCorrect = bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Password is wrong",
      });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "secret",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      result: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "Email is exist. Please use another email",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password doesn't match",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "secret",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      result,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: `Something went wrong. Error: ${error.message}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.status(401).json({
      message: "Authentication needed",
    });
  }

  if (id !== req.userId) {
    return res.status(400).json({
      message: "You can't delete other user",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({
      message: "Data not found with this id",
    });
  }

  await User.findByIdAndRemove(id);

  res.status(200).json({
    message: "User is successfuly deleted",
  });
};

export const editProfile = async (req, res) => {};
