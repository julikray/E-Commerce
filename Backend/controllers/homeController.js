import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import queryProducts from "../utiles/queryProducts.js";
import reviewModel from "../models/reviewModel.js";
import moment from "moment";
import mongoose from "mongoose";

class homeController {

 

  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  getCategorys = async (req, res) => {
    try {
      const categorys = await categoryModel.find({});
      return res.status(200).json({ categorys });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getProducts = async (req, res) => {
    try {
      const products = await productModel.find({}).limit(16).sort({ createdAt: -1 });
      const allProduct1 = await productModel.find({}).limit(9).sort({ createdAt: -1 });
      const latestProducts = this.formateProduct(allProduct1);
       const allProduct2 = await productModel.find({}).limit(9).sort({ rating: -1 });
        const topRatedProducts = this.formateProduct(allProduct2);
           const allProduct3 = await productModel.find({}).limit(9).sort({ discount: -1 });
            const discountProducts = this.formateProduct(allProduct3);

    //   console.log(latestProducts);

      return res.status(200).json({ products , latestProducts ,topRatedProducts , discountProducts});
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
  };

  getProductDetails = async (req , res) => {
    const {slug } = req.params;
  
    try {
      const product = await productModel.findOne({
        slug
      })
      const relatedProducts = await productModel.find({
        $and: [{
          _id:{
            $ne: product.id
          }
        },
        {
          category: {
            $eq: product.category
          }
        }
      
      ]
      }).limit(20)

      const moreProducts = await productModel.find({
        $and: [{
          _id:{
            $ne: product.id
          }
        },
        {
          sellerId: {
            $eq: product.sellerId
          }
        }
      
      ]
      }).limit(3)

      return res.status(200).json({ product , relatedProducts , moreProducts });
      
    } catch (error) {
       return res.status(500).json({ error: error.message });
      
    }
    
  }



   priceRangeProduct = async (req, res) => {
   
    try {
      const priceRange ={
        low:0,
        high:0
      }
       const products = await productModel.find({}).limit(9).sort({ createdAt: -1 });
        const latestProducts = this.formateProduct(products);
        const getForPrice = await productModel.find({}).sort({ 'price':1 })
        if(getForPrice.length >0 ){
          priceRange.high = getForPrice[getForPrice.length -1].price
          priceRange.low = getForPrice[0].price
        }
        // console.log(priceRange)

       
      return res.status(200).json({ latestProducts , priceRange });
    } catch (error) {
      // return res.status(500).json({ error: error.message });
    }
  };


  // queryProducts = async (req, res) =>{
  //    const parPage = 12
  //    req.query.parPage = parPage

  //    try {
  //     const products = await productModel.find({}).sort({ createdAt: -1 })
  //     const totalProduct = new queryProducts(products , req.query ).categoryQuery().priceQuery().ratingQuery().sortByPrice().countProducts();

  //     const result = new queryProducts(products , req.query ).categoryQuery().ratingQuery().priceQuery().sortByPrice().skip().limit().getProducts();

  //      return res.status(200).json({ products: result , totalProduct });
  //   } catch (error) {
  //     console.log(error.message);
  //     return res.status(500).json({ error: error.message });
  //   }
  // }

  queryProducts = async (req, res) => {
  const parPage = 1;
  req.query.parPage = parPage;
  console.log(req.query)

  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });

    const filteredInstance = new queryProducts(products, req.query)
      .categoryQuery()
      .searchQuery()
      .priceQuery()
      .ratingQuery()
      .sortByPrice();

    const totalProduct = filteredInstance.getProducts().length;

    const result = filteredInstance.skip().limit().getProducts();

    return res.status(200).json({ products: result, totalProduct , parPage });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

customerReview = async (req , res) => {
   const {name , rating , review , productId } = req.body;

   try {
    await reviewModel.create({
      productId,
      name,
      rating,
      review, 
      date: moment(Date.now()).format('LL')
    })
    let rat = 0;
    const reviews = await reviewModel.find({productId});

    for(let i =0 ; i<reviews.length; i++ ){
      rat = rat + reviews[i].rating
    }
    let productRating = 0;
    if(reviews.length !== 0){
      productRating = (rat / reviews.length).toFixed(1)
    }

    await productModel.findByIdAndUpdate(productId , {
      rating: productRating
    })

       return res.status(201).json({ message: 'Review success' });
    
   } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
    
   }
}

getCustomerReview = async (req, res) => {
  const {productId} = req.params
  let {pageNo} = req.query
  pageNo = parseInt(pageNo)
  const limit = 5
  const skipPage = limit * (pageNo - 1)

  try {
    let getRating = await reviewModel.aggregate([{
      $match: {
        productId:{
          $eq: new mongoose.Types.ObjectId(productId)
        },
        rating: {
          $not: {
            $size: 0
          }
        }
      }
    },
    {
      $unwind: "$rating"
    },
    {
      $group: {
        _id: '$rating',
        count: {
          $sum:1
        }
      }
    }
  
  ])

  const ratingReview = [{
    rating:5,
    sum:0
  },
  {
    rating:4,
    sum:0
  },
  {
    rating:3,
    sum:0
  },
  {
    rating:2,
    sum:0
  },
  {
    rating:1,
    sum:0
  }


]

for(let i = 0; i< ratingReview.length; i++){
  for(let j = 0 ; j< getRating.length; j++){
    if(ratingReview[i].rating === getRating[j]._id){
      ratingReview[i].sum = getRating[j].count
      break
    }
  }
}

const getAll = await reviewModel.find({
  productId
})

const reviews = await reviewModel.find({
  productId
}).skip(skipPage).limit(limit).sort({
  createdAt: -1
})





  console.log(ratingReview)

   return res.status(200).json({ reviews , totalReview: getAll.length , ratingReview  });
    
  } catch (error) {
     console.log(error.message);
    return res.status(500).json({ error: error.message });
    
  }
 
}




}

export default new homeController();
