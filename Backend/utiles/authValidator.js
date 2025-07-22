import { body, validationResult } from "express-validator";

// Utility to check for Gmail domain
const onlyGmail = body("email")
  .isEmail()
  .withMessage("Valid email is required")
  .custom((email) => {
    const domain = email.split("@")[1]?.toLowerCase();
    // console.log("Validator running — domain:", domain);  
    if (domain !== "gmail.com") {
      throw new Error("Only Gmail addresses are allowed");
    }
    return true;
  });

// Customer Register Validator
export const customerRegisterValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  onlyGmail,
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Customer Login Validator
export const customerLoginValidator = [
  onlyGmail,
  body("password").notEmpty().withMessage("Password is required"),
];

// Seller Register Validator
export const sellerRegisterValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  onlyGmail,
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Seller Login Validator
export const sellerLoginValidator = [
  onlyGmail,
  body("password").notEmpty().withMessage("Password is required"),
];

// Error Handler
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};
