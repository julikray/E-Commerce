import sellerWallet from "../models/sellerWallet.js";
import mongoose from "mongoose";
import productModel from "../models/productModel.js";
import authOrder from "../models/authOrder.js";
import sellerCustomerMessageModel from "../models/chat/sellerCustomerMessage.js";
import myShopWallet from "../models/myShopWallet.js";
import customerOrder from "../models/customerOrder.js";
import sellerModel from "../models/sellerModel.js";
import adminSellerMessage from "../models/chat/adminSellerMessage.js";

class dashboardIndexController {
  async getSellerReqDashboardIndex(req, res) {
    const { id } = req;

    try {
      const totalSale = await sellerWallet.aggregate([
        {
          // $match : {
          //     sellerId : {
          //         $eq:id

          //     }
          // }
          $match: {
            sellerId: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      const totalProduct = await productModel
        .find({
          sellerId: new mongoose.Types.ObjectId(id),
        })
        .countDocuments();

      const totalOrder = await authOrder
        .find({
          sellerId: new mongoose.Types.ObjectId(id),
        })
        .countDocuments();

      const totalPendingOrder = await authOrder
        .find({
          $and: [
            {
              sellerId: {
                $eq: new mongoose.Types.ObjectId(id),
              },
            },
            {
              deliveryStatus: {
                $eq: "pending",
              },
            },
          ],
        })
        .countDocuments();

      const messages = await sellerCustomerMessageModel
        .find({
          $or: [
            {
              senderId: {
                $eq: new mongoose.Types.ObjectId(id),
              },
            },
            {
              receverId: {
                $eq: new mongoose.Types.ObjectId(id),
              },
            },
          ],
        })
        .limit(3);

      const recentOrders = await authOrder
        .find({
          sellerId: new mongoose.Types.ObjectId(id),
        })
        .limit(5);

      res.status(200).json({
        totalOrder,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
        totalPendingOrder,
        messages,
        recentOrders,
        totalProduct,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getAdminReqDashboardIndex(req, res) {
    const { id } = req;

    try {
      const totalSale = await myShopWallet.aggregate([
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$amount" },
          },
        },
      ]);

      const totalProduct = await productModel.find({}).countDocuments();

      const totalOrder = await customerOrder.find({}).countDocuments();

      const totalSeller = await sellerModel.find({}).countDocuments();

      const messages = await adminSellerMessage.find({}).limit(3);

      const recentOrders = await customerOrder.find({}).limit(5);

      res.status(200).json({
        totalOrder,
        totalSale: totalSale.length > 0 ? totalSale[0].totalAmount : 0,
        totalSeller,
        messages,
        recentOrders,
        totalProduct,
      });
    } catch (error) {}
  }
}

export default new dashboardIndexController();
