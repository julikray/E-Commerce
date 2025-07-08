import tokenCreate from "../middleware/tokenCreate.js";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import sellerModel from "../models/sellerModel.js";
import SellerCustomerModel from "../models/chat/sellerCustomerModel.js";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

class AuthController {
  async admin_login(req, res) {
    const { email, password } = req.body;

    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      console.log(admin);

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        console.log(match);

        if (match) {
          const token = await tokenCreate({
            id: admin.id,
            role: admin.role,
          });

          res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
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
    // console.log(req.body);
  }

  async seller_register(req, res) {
    const { email, name, password } = req.body;
    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        return res.status(404).json({ error: "Email Already Exit." });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manually",
          shopInfo: {},
        });

        await SellerCustomerModel.create({
          myId: seller.id,
        });
        const token = await tokenCreate({
          id: seller.id,
          role: seller.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        console.log(seller);
        return res
          .status(201)
          .json({ token, message: "Seller registered successfully.", seller });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async seller_login(req, res) {
    const { email, password } = req.body;

    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      console.log(seller);

      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        console.log(match);

        if (match) {
          const token = await tokenCreate({
            id: seller.id,
            role: seller.role,
          });

          res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",

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
    // console.log(req.body);
  }

  async getUser(req, res) {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        return res.status(200).json({ userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        return res.status(200).json({ userInfo: seller });
      }
    } catch (error) {
      return res.status(500).send("Internal Server Error");
    }
  }

  async profile_image_upload(req, res) {
    console.log("Starting profile image upload...");

    const { id } = req;
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log("Form parsing error:", err);
        return res.status(400).json({ error: "Error in form parsing" });
      }

      console.log("Files:", files);

      const image = files.image; // ✅ define image before using it
      const imageFile = Array.isArray(image) ? image[0] : image;

      if (!imageFile || !imageFile.filepath) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      console.log("Image file path:", imageFile.filepath);

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        const result = await cloudinary.uploader.upload(imageFile.filepath, {
          folder: "profile",
        });

        if (result) {
          await sellerModel.findByIdAndUpdate(id, {
            image: result.url,
          });

          const userInfo = await sellerModel.findById(id);

          return res.status(201).json({
            userInfo,
            message: "Profile Image Updated Successfully",
          });
        } else {
          return res.status(404).json({ error: "Image Upload Failed" });
        }
      } catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).json({ error: error.message });
      }
    });
  }

  async profileInfoAdd(req, res) {
    const { division, district, shopName, sub_district } = req.body;
    const { id } = req;

    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          division,
          district,
          sub_district,
        },
      });
      const userInfo = await sellerModel.findById(id);
      return res
        .status(201)
        .json({ message: "Profile info add successfully", userInfo });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async logout(req, res) {
    try {
      res.cookie("accessToken", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      return res.status(200).json({ message: "logout success" });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  }


 
   async sellerChangePassword(req, res) {
    try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find seller and include password in query
    const seller = await sellerModel.findOne({ email }).select("+password");
    if (!seller) {
      return res.status(404).json({ error: "Seller not found." });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, seller.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    seller.password = hashedPassword;

    await seller.save();

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ error: "Server error. Please try again later." });
  }

  }
}

export default new AuthController();
