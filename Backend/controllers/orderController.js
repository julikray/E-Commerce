import moment from "moment";
import customerOrder from "../models/customerOrder.js";
import authOrder from "../models/authOrder.js";
import cardModel from "../models/cardModel.js";
import mongoose from "mongoose";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
        tempCusPro.quantity = pro[j].quantity;
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

  getDashboardIndexData = async (req, res) => {
    // console.log(req.params)
    const { userId } = req.params;

    try {
      const recentOrders = await customerOrder.find({
        customerId: new mongoose.Types.ObjectId(userId),
      });
      const pendingOrder = await customerOrder
        .find({
          customerId: new mongoose.Types.ObjectId(userId),
          deliveryStatus: "pending",
        })
        .countDocuments();

      const totalOrder = await customerOrder
        .find({
          customerId: new mongoose.Types.ObjectId(userId),
        })
        .countDocuments();

      const cancelledOrder = await customerOrder
        .find({
          customerId: new mongoose.Types.ObjectId(userId),
          deliveryStatus: "cancelled",
        })
        .countDocuments();

      return res
        .status(200)
        .json({ recentOrders, pendingOrder, totalOrder, cancelledOrder });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };

  getOrder = async (req, res) => {
    const { customerId, status } = req.params;

    try {
      let orders = [];
      if (status !== "all") {
        orders = await customerOrder.find({
          customerId: new mongoose.Types.ObjectId(customerId),
          deliveryStatus: status,
        });
      } else {
        orders = await customerOrder.find({
          customerId: new mongoose.Types.ObjectId(customerId),
        });
      }

      return res.status(200).json({ orders });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };

  getOrders = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await customerOrder.findById(orderId);

      return res.status(200).json({ order });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal Server Error");
    }
  };

  getAdminOrders = async (req, res) => {
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        // const sellers = await sellerModel.find({
      } else {
        const orders = await customerOrder
          .aggregate([
            {
              $lookup: {
                from: "authorders",
                localField: "_id",
                foreignField: "orderId",
                as: "subOrder",
              },
            },
          ])
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder = await customerOrder.aggregate([
          {
            $lookup: {
              from: "authorders",
              localField: "_id",
              foreignField: "orderId",
              as: "subOrder",
            },
          },
        ]);

        return res.status(200).json({ orders, totalOrder: totalOrder.length });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  getAdminOrdersDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await customerOrder.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(orderId),
          },
        },
        {
          $lookup: {
            from: "authorders",
            localField: "_id",
            foreignField: "orderId",
            as: "subOrder",
          },
        },
      ]);

      return res.status(200).json({ order: order[0] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  adminOrderStatusUpdate = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        deliveryStatus: status,
      });

      return res.status(200).json({ message: "order status change success" });
    } catch (error) {
      console.log("get admin order status error" + error.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  getSellerOrders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, searchValue, parPage } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
       
      } else {
        const orders = await authOrder
          .find( {
            sellerId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totalOrder =  await authOrder
          .find( {
            sellerId,
          }).countDocuments()

        return res.status(200).json({ orders, totalOrder  });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };


   getSellerOrdersDetails = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await authOrder.findById( orderId);

      return res.status(200).json({ order  });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  sellerOrderStatusUpdate = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
      await authOrder.findByIdAndUpdate(orderId, {
        deliveryStatus: status,
      });

      return res.status(200).json({ message: "order status change success" });
    } catch (error) {
      console.log("get admin order status error" + error.message);
      return res.status(500).json({ message: "internal server error" });
    }
  };

  createPayment = async (req, res) => {
   const { price } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: Math.round(price * 100), // amount in paisa
      currency: "inr", // ✅ INR for Indian Rupees
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(200).json({ clientSecret: payment.client_secret  });

  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
}



}

export default new orderController();
