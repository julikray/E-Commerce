import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import categoryModel from "../models/categoryModel.js";

class categoryController {
  //start add category
  async add_category(req, res) {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      console.log("FIELDS:", fields);
      console.log("FILES:", files);

      if (err) {
        return res.status(400).json({ error: "Form parsing error" });
      }

      let { name } = fields;
      let imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

      if (!imageFile || !imageFile.filepath) {
        return res
          .status(400)
          .json({ error: "Missing required parameter - file" });
      }

      name = Array.isArray(name) ? name[0] : name;
      name = name.trim();
      const slug = name.split(" ").join("-");

      try {
        cloudinary.config({
          cloud_name: process.env.CLOUDINARY_NAME,
          api_key: process.env.CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
        });

        const result = await cloudinary.uploader.upload(imageFile.filepath, {
          folder: "categorys",
        });

        const category = await categoryModel.create({
          name,
          slug,
          image: result.url,
        });

        return res
          .status(201)
          .json({ category, message: "Category added successfully" });
      } catch (error) {
        console.error("Upload Error:", error);
        return res.status(500).send("Internal Server Error");
      }
    });
  }

  //end add category


  //start get category
  async get_category(req, res) {
    const { page, searchValue, parPage } = req.query;

    const pageNumber = parseInt(page) || 1;
    const itemsPerPage = parseInt(parPage) || 10;
     
    try {

      let skipPage = ''
      if(parPage && page){
      skipPage = itemsPerPage * (pageNumber - 1);

      }
      let query = {};

      if (searchValue) {
        query = {
          $or: [
            { name: { $regex: searchValue, $options: "i" } },
            { slug: { $regex: searchValue, $options: "i" } },
          ],
        };
      }

      const categorys = await categoryModel
        .find(query)
        .skip(skipPage)
        .limit(itemsPerPage)
        .sort({ createdAt: -1 });

      const totalCategory = await categoryModel.countDocuments(query);

      return res.status(200).json({ categorys, totalCategory });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  //end get category


}

export default new categoryController();
