import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import bannerModel from "../models/bannerModel.js";
import mongoose from "mongoose";


class bannerController {
  async addBanner(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Form parse error", error: err.message });
      }

      const productId = fields.productId?.[0] || fields.productId;
      const bannerFile = Array.isArray(files.image)
        ? files.image[0]
        : files.image;

      //   console.log("Parsed fields:", fields);
      //   console.log("Parsed files:", files);

      if (!productId || !bannerFile || !bannerFile.filepath) {
        return res
          .status(400)
          .json({ message: "Missing required fields or file" });
      }

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        const product = await productModel.findById(productId);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        const result = await cloudinary.uploader.upload(bannerFile.filepath, {
          folder: "banners",
        });

        const banner = await bannerModel.create({
          productId,
          banner: result.secure_url,
          link: product.slug,
        });

        return res
          .status(201)
          .json({ banner, message: "Banner added successfully" });
      } catch (error) {
        console.error("Upload error:", error);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      }
    });
  }

  async getBanner(req, res) {
    const { productId } = req.params;

    try {
      const banner = await bannerModel.findOne({
        productId: new mongoose.Types.ObjectId(productId),
      });

      return res.status(200).json({ banner });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send("Internal Server Error");
    }
  }


async updateBanner(req, res) {
  const { bannerId } = req.params;

  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Form parse error", error: err.message });
    }

    const imageFile = files?.image
      ? Array.isArray(files.image)
        ? files.image[0]
        : files.image
      : null;

    if (!imageFile || !imageFile.filepath) {
      return res.status(400).json({ message: "No image file provided or file is invalid" });
    }

    // Cloudinary config
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    try {
      let banner = await bannerModel.findById(bannerId);
      if (!banner) {
        return res.status(404).json({ message: "Banner not found" });
      }

      // Extract the public ID of the old image
      const imageUrlParts = banner.banner.split('/');
      const imageFilename = imageUrlParts[imageUrlParts.length - 1];
      const imagePublicId = `banners/${imageFilename.split('.')[0]}`;

      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(imagePublicId);

      // Upload new image
      const result = await cloudinary.uploader.upload(imageFile.filepath, {
        folder: "banners",
      });

      // Update DB
      await bannerModel.findByIdAndUpdate(bannerId, {
        banner: result.secure_url,
      });

      banner = await bannerModel.findById(bannerId); // Get updated doc

      return res.status(200).json({ banner, message: "Banner updated successfully" });
    } catch (error) {
      console.error("Update banner error:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
}


 async getHomeBanner(req, res) {
    
    try {
      const banners = await bannerModel.aggregate([

          {
              $sample: {
                  size:10
              }
          }
      ]
         
    );

      return res.status(200).json({ banners });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send("Internal Server Error");
    }
  }



}

export default new bannerController();
