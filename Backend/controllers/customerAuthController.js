import bcrypt from "bcrypt";
import customerModel from "../models/customerModel.js";
import tokenCreate from "../middleware/tokenCreate.js";
import SellerCustomerModel from "../models/chat/sellerCustomerModel.js";

class customerAuthController {
  async customerRegister(req, res) {
    const { email, name, password } = req.body;
    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        return res.status(404).json({ error: "Email Already Exit." });
      } else {
        const createCustomer = await customerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manually",
        });

        await SellerCustomerModel.create({
          myId: createCustomer.id,
        });

        const token = await tokenCreate({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        console.log(req.body);
        return res.status(201).json({
          token,
          message: "Registered successfully.",
          createCustomer,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async customerLogin(req, res) {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        console.log(match);

        if (match) {
          const token = await tokenCreate({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });

          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          return res.status(200).json({ token, message: "Login success." });
        } else {
          return res.status(404).json({ error: "Password not found." });
        }
      } else {
        return res.status(404).json({ error: "Email not found." });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  }

  async customerLogout(req, res) {
    try {
      res.cookie("customerToken", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      return res.status(200).json({ message: "logout success" });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  }
}

export default new customerAuthController();
