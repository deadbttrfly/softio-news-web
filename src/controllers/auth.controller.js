import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  findUserByUsername,
} from "../services/auth.service.js";

export async function login(req, res) {
  try {
    const { username, password } =
      req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        message:
          "Username dan password wajib diisi",
      });
    }

    const user =
      await findUserByUsername(username);

    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({
        message:
          "Username atau password salah",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log("MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message:
          "Username atau password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}