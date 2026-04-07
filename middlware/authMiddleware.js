import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerValidate = [
  body("name")
    .notEmpty()
    .withMessage("name obligatoire")
    .isLength({ min: 2 })
    .withMessage("Le nom doit avoir au moins 2 caractères"),

  body("email")
    .notEmpty()
    .withMessage("email obligatoire")
    .isEmail()
    .withMessage("email invalide"),

  body("password")
    .notEmpty()
    .withMessage("mot de passe obligatoire")
    .isLength({ min: 8 })
    .withMessage("Password doit contenir au moins 8 caractères"),

  body("password_confirmation")
    .notEmpty()
    .withMessage("confirmation obligatoire")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(
          "mot de passe de confirmation pas le même mot de passe",
        );
      }
      return true;
    }),
  body("role")
    .optional()
    .isIn(["admin", "client"])
    .withMessage("role doit être client ou admin"),
];

// validation pour login
export const loginValidation = [
  body("email").isEmail().withMessage("email invalide"),

  body("password").notEmpty().withMessage("password obligatoire"),
];

export const handleErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const exsitEmail = await User.findOne({ email });
    if (exsitEmail) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const loginCheckEmailPasseword = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "cette user non trouvé" });
    }
    const verfyPassword = await bcrypt.compare(password, user.password);
    if (!verfyPassword) {
      return res.status(400).json({ message: "mot de passe incorrecte" });
    }
    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer")) {
      return res.status(401).json({ message: "Non autorisé, token manquant" });
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "utilisateur introuvable" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "token invalide",error:err.message });
  }
};
