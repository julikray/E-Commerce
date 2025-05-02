// utiles/authValidator.js
import { check, validationResult } from "express-validator";

export const validateRegister = [
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  check("name", "Name is required").notEmpty(),

  (req, res, next) => {
    console.log("Validator middleware running"); // Debug log
    console.log("BODY:", req.body); // Debug log
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
