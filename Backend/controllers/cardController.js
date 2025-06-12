import mongoose from "mongoose";
import cardModel from "../models/cardModel.js";
import wishlistModel from "../models/wishlistModel.js";

class cardController {
  addToCard = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });
      if (product) {
        return res
          .status(404)
          .json({ error: "Product already added to card." });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
        });
        return res
          .status(201)
          .json({ message: "Add to card success", product });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  getCardProducts = async (req, res) => {
    const co =5;
    const { userId } = req.params;

    try {
      const cardProduct = await cardModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);


      let buyProductItem = 0;
      let calculatePrice = 0;
      let cardProductsCount = 0;
      const outOfStockProducts = cardProduct.filter(p => p.products[0].stock < p.quantity)
      
      for(let i=0; i<outOfStockProducts.length ; i++){
        cardProductsCount = cardProductsCount + outOfStockProducts[i].quantity
      }

      const stockProduct = cardProduct.filter(p => p.products[0].stock >= p.quantity)

      for(let i =0; i < stockProduct.length ; i++){
        const {quantity} = stockProduct[i]
        cardProductsCount = cardProductsCount + quantity
        buyProductItem = buyProductItem + quantity
        const { price , discount } = stockProduct[i].products[0]
        if(discount !==0 ){
            calculatePrice = calculatePrice + quantity*(price - Math.floor((price*discount)/100))
        }else{
            calculatePrice = calculatePrice + quantity * price
        }
      }

      let p =[]
      let unique = [...new Set(stockProduct.map(p => p.products[0].sellerId.toString() )) ]

      for(let i= 0; i< unique.length; i++ ){
        let price =0 ;
        for(let j =0 ; j<stockProduct.length; j++){
            const tempProduct = stockProduct[j].products[0]
            if(unique[i] === tempProduct.sellerId.toString()){
                let pri =0 ;
                if (tempProduct.discount !== 0 ){
                    pri = tempProduct.price - Math.floor((tempProduct.price*tempProduct.discount)/100)
                }else {
                    pri = tempProduct.price
                }
                pri = pri - Math.floor((pri*co)/100)
                price = price + pri*stockProduct[j].quantity
                p[i] = {
                    sellerId : unique[i],
                    shopName : tempProduct.shopName,
                    price,
                    products : p[i] ? [...p[i].products,
                    {
                        _id: stockProduct[j]._id,
                        quantity: stockProduct[j].quantity,
                        productInfo : tempProduct
                    }
                ] : [
                    {
                       _id: stockProduct[j]._id,
                        quantity: stockProduct[j].quantity,
                        productInfo : tempProduct
                    }
                ]
                }
            }
        }
      }

    //   console.log(p );
    //   console.log(outOfStockProducts );

    //     console.log("Card products:",calculatePrice );

        return res.status(200).json({

            cardProduct:p,
            price: calculatePrice,
            cardProductsCount,
            shippingFee : 80 * p.length,
            outOfStockProducts,
            buyProductItem
        }

        );
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };


  deleteCardProduct = async (req , res) => {
    // console.log(req.params)
    const { cardId } = req.params

    try {
      await cardModel.findByIdAndDelete(cardId)
      return res
          .status(200)
          .json({ message: "Product remove successfully"});

      
    } catch (error) {
       console.log({ error });
      return res.status(500).send("Internal Server Error");
      
    }


  }

    quantityInc = async (req , res) => {
    // console.log(req.params)
    const { cardId } = req.params

    try {
       const product = await cardModel.findById(cardId)
       const { quantity} = product
       await cardModel.findByIdAndUpdate(cardId , {
        quantity : quantity + 1
       })
      return res
          .status(200)
          .json({ message: "Successfully"});

      
    } catch (error) {
       console.log({ error });
      return res.status(500).send("Internal Server Error");
      
    }


  }

     quantityDec = async (req , res) => {
    // console.log(req.params)
    const { cardId } = req.params

    try {
       const product = await cardModel.findById(cardId)
       const { quantity} = product
       await cardModel.findByIdAndUpdate(cardId , {
        quantity : quantity - 1
       })
      return res
          .status(200)
          .json({ message: "Successfully"});

      
    } catch (error) {
       console.log({ error });
      return res.status(500).send("Internal Server Error");
      
    }


  }

  addToWishlist = async (req , res) => {
    // console.log(req.body)
     const { slug } = req.body;

    try {
      const product = await wishlistModel.findOne({
        slug
      })
        
      if (product) {
        return res
          .status(404)
          .json({ error: "Already added " });
      } else {
         await wishlistModel.create(req.body)
        return res
          .status(201)
          .json({ message: "Add to wishlist success"});
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }

  }

 

  getWishlistProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlists = await wishlistModel.find({ userId: new mongoose.Types.ObjectId(userId) });

    return res.status(200).json({ wishlistCount: wishlists.length,  wishlists });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};


removeWishlistProducts = async (req, res) => {

   const { wishlistId } = req.params;
 

  try {
    const wishlists = await wishlistModel.findByIdAndDelete(wishlistId)

    return res.status(200).json({ message: "Remove success" , wishlistId });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }

}



}

export default new cardController();
