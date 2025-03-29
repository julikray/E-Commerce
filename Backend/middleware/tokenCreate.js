import jwt from "jsonwebtoken";

const tokenCreate = ({ id, role }) => {
  return jwt.sign({ id, role }, process.env.JWT_KEY, {
    expiresIn: "7d",
  });
};

export default tokenCreate;
