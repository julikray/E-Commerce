// import formidable from "formidable";
// import { v2 as cloudinary } from "cloudinary";
// import productModel from "../models/productModel.js";

// class productController {
//   //start add product
//   async add_product(req, res) {
//     const {id } = req;
//     const form = formidable({ multiples: true });

//     form.parse(req, async (err, field, files) => {
//       //   console.log("FIELDS:", field );
//       //   console.log("FILES:", files);

//       let {
//         name,
//         description,
//         discount,
//         price,
//         brand,
//         stock,
//         shopName,
//         category,
//       } = field;
//       const { images } = files;
//       name = name.trim()
//       const slug = name.split(" ").join("-");

//       cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//         secure: true,
//       });

//       try {
//         let allImageUrl = [];
//         for (let i = 0; i < images.length; i++) {
//           const result = await cloudinary.uploader.upload(images[i].filepath, {
//             folder: "products",
//           });
//           allImageUrl = [...allImageUrl, result.url];
//         }

//         await productModel.create({
//           sellerId:id,
//           name,
//           slug,
//           description : description.trim(),
//           discount: parseInt(discount),
//           price: parseInt(price) ,
//           brand : brand.trim() ,
//           stock : parseInt(stock) ,
//           shopName,
//           category: category.trim(),
//           images: allImageUrl
//         });

//         return res
//         .status(201)
//         .json({ message: "Product added successfully" });

//       } catch (error) {
//         console.error("Upload Error:", error);
//         return res.status(500).send("Internal Server Error");
//       }
//     });
//   }

//   //end add product
// }

// export default new productController();

import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

class productController {
  //start add product
  async addProduct(req, res) {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      if (err) {
        return res.status(400).json({ message: "Form parse error" });
      }

      // Destructure and safely trim/parse values
      let {
        name,
        description,
        discount,
        price,
        brand,
        stock,
        shopName,
        category,
      } = field;

      name = name?.[0]?.trim();
      description = description?.[0]?.trim();
      discount = parseInt(discount?.[0]);
      price = parseInt(price?.[0]);
      brand = brand?.[0]?.trim();
      stock = parseInt(stock?.[0]);
      shopName = shopName?.[0]?.trim();
      category = category?.[0]?.trim();

      const slug = name?.split(" ").join("-");

      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });

      try {
        const { images } = files;

        let allImageUrl = [];
        const imagesArray = Array.isArray(images) ? images : [images];

        for (let i = 0; i < imagesArray.length; i++) {
          const result = await cloudinary.uploader.upload(
            imagesArray[i].filepath,
            {
              folder: "products",
            }
          );
          allImageUrl.push(result.url);
        }

        await productModel.create({
          sellerId: id,
          name,
          slug,
          description,
          discount,
          price,
          brand,
          stock,
          shopName,
          category,
          images: allImageUrl,
        });

        return res.status(201).json({ message: "Product added successfully" });
      } catch (error) {
        console.error("Error", error);
        return res.status(500).send("Internal Server Error");
      }
    });
  }
  //end add product

  async getProduct(req, res) {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();

        return res.status(200).json({ products, totalProduct });
      } else {
        const products = await productModel
          .find({
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            sellerId: id,
          })
          .countDocuments();

        return res.status(200).json({ products, totalProduct });
      }
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async editProduct(req, res) {
    const { productId } = req.params;

    try {
      const product = await productModel.findById(productId);

      return res.status(200).json({ product });
    } catch (error) {
      console.error("Error", error);
      return res.status(500).send("Internal Server Error");
    }
  }

  async product_update(req, res) {
    let { name, description, discount, price, brand, stock, productId } = req.body;

    name = name.trim()
    const slug = name.split(' ').join('-')

    try {

      await productModel.findByIdAndUpdate(productId ,{
        name, description, discount, price, brand, stock, productId, slug
      })

      const product = await productModel.findById(productId)

      return res.status(200).json({ product , message: "Product Updated Successfully" });
      
    } catch (error) {
      console.error("Error ", error);
      return res.status(500).send("Internal Server Error");
      
    }

  }



  async product_image_update (req,res){

    const form = formidable({multiples : true})

    form.parse(req, async (err,field,files) => {

      console.log(files)
      console.log(field)


      const {oldImage ,productId } = field;
      const { newImage } = files

      if(err){

        return res.status(400).json({ error: err.message });

      }else{
        try {

          cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true,
          });

          const result = await cloudinary.uploader.upload(newImage[0].filepath,{ folder: "products" })

          if(result){

            let {images} = await productModel.findById(productId)
            const index = images.findIndex(img => img == oldImage)
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId , {images})

            const product = await productModel.findById(productId)

            return res.status(200).json({ product , message: "Product Image Updated Successfully" });

          }else{
            return res.status(404).json({ error: 'Image Upload Failed' });

          }




          
        } catch (error) {
          console.error("Upload Error:", error);
          return res.status(404).json({ error: error.message });
          // return res.status(500).send("Internal Server Error");
          
        }
      } 

       
    } )


  }



  // async product_image_update(req, res) {
  //   const form = formidable({ multiples: true });
  
  //   form.parse(req, async (err, fields, files) => {
  //     if (err) {
  //       return res.status(400).json({ error: err.message });
  //     }
  
  //     const { oldImage, productId } = fields;
  //     const { newImage } = files;
  
  //     try {
  //       // Cloudinary config
  //       cloudinary.config({
  //         cloud_name: process.env.CLOUDINARY_NAME,
  //         api_key: process.env.CLOUDINARY_API_KEY,
  //         api_secret: process.env.CLOUDINARY_API_SECRET,
  //         secure: true,
  //       });
  
  //       const imageFile = Array.isArray(newImage) ? newImage[0] : newImage;
  
  //       // Upload new image
  //       const result = await cloudinary.uploader.upload(imageFile.filepath, {
  //         folder: "products",
  //       });
  
  //       if (!result || !result.secure_url) {
  //         return res.status(500).json({ error: "Image upload failed" });
  //       }
  
  //       // Delete old image from Cloudinary
  //       const oldPublicId = oldImage.split("/").slice(-2).join("/").split(".")[0]; // e.g., products/image123
  //       await cloudinary.uploader.destroy(oldPublicId);
  
  //       // Update DB
  //       let { images } = await productModel.findById(productId);
  //       const index = images.findIndex((img) => img === oldImage);
  //       images[index] = result.secure_url;
  
  //       await productModel.findByIdAndUpdate(productId, { images });
  
  //       const product = await productModel.findById(productId);
  //       return res.status(200).json({
  //         product,
  //         message: "Product Image Updated Successfully",
  //       });
  //     } catch (error) {
  //       console.error("Image Update Error:", error);
  //       return res.status(500).json({ error: error.message });
  //     }
  //   });
  // }
  

 
  

}

export default new productController();
