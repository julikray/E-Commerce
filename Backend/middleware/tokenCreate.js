import jwt from "jsonwebtoken";

const tokenCreate = ({  id, name, email, method, role}) => {
  return jwt.sign({ id, name, email, method, role}, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
};

export default tokenCreate;
