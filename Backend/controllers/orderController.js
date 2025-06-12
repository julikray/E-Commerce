import moment from "moment";
import customerOrder from "../models/customerOrder.js";
import authOrder from "../models/authOrder.js";
import cardModel from "../models/cardModel.js";
import mongoose from "mongoose";

class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrder.findById(id);
      if (order.paymentStatus === "unpaid") {
        await customerOrder.findByIdAndUpdate(id, {
          deliveryStatus: "cancelled",
        });

        await authOrder.updateMany(
          {
            orderId: id,
          },
          {
            deliveryStatus: "cancelled",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  placeOrder = async (req, res) => {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;
    let authOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format("LLL");
    let customerOrderProduct = [];

    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        let tempCusPro = pro[j].productInfo;
        customerOrderProduct.push(tempCusPro);
        if (pro[j]._id) {
          cardId.push(pro[j]._id);
        }
      }
    }

    try {
      const order = await customerOrder.create({
        customerId: userId,
        shippingInfo,
        products: customerOrderProduct,
        price: price + shipping_fee,
        deliveryStatus: "pending",
        paymentStatus: "unpaid",
        date: tempDate,
      });

      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].sellerId;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          let tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;
          storePro.push(tempPro);
        }

        authOrderData.push({
          orderId: order.id,
          sellerId,
          products: storePro,
          price: pri,
          paymentStatus: "unpaid",
          shippingInfo: "myshop warehouse",
          deliveryStatus: "pending",
          date: tempDate,
        });
      }

      await authOrder.insertMany(authOrderData);

      for (let k = 0; k < cardId.length; k++) {
        await cardModel.findByIdAndDelete(cardId[k]);
      }
      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 5000);

      return res
        .status(201)
        .json({ message: "Order placed success", orderId: order.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getDashboardIndexData = async(req , res) => {
    // console.log(req.params)
    const {userId} = req.params

    try {
        const recentOrders = await customerOrder.find({
            customerId: new mongoose.Types.ObjectId(userId)
        })
        const pendingOrder = await customerOrder.find({
            customerId: new mongoose.Types.ObjectId(userId),
            deliveryStatus: 'pending'
        }).countDocuments()

        const totalOrder = await customerOrder.find({
            customerId: new mongoose.Types.ObjectId(userId),

        }).countDocuments()
        
        const cancelledOrder = await customerOrder.find({
            customerId: new mongoose.Types.ObjectId(userId),
            deliveryStatus: 'cancelled'
        }).countDocuments()
        
         return res.status(200).json({ recentOrders, pendingOrder , totalOrder , cancelledOrder });

        
        
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error");
        
    }

  }

  getOrder = async(req , res) => {
    const { customerId , status } = req.params

    try {
      let orders = []
      if(status !== 'all'){
        orders = await customerOrder.find({
          customerId: new mongoose.Types.ObjectId(customerId),
          deliveryStatus:status
        })
      } else {
        orders = await customerOrder.find({
          customerId : new mongoose.Types.ObjectId(customerId)
        })
      }

      return res.status(200).json({ orders });

      
    } catch (error) {
      console.log(error)
      return res.status(500).send("Internal Server Error");
      
    }
  

  }

  getOrders = async(req , res) => {
    const {  orderId } = req.params

    try {

      const order = await customerOrder.findById(orderId)
     

      return res.status(200).json({ order });

      
    } catch (error) {
      console.log(error)
      return res.status(500).send("Internal Server Error");
      
    }
  

  }


}

export default new orderController();
