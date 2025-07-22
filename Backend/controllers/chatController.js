import sellerModel from "../models/sellerModel.js";
import customerModel from "../models/customerModel.js";
import sellerCustomerModel from "../models/chat/sellerCustomerModel.js";
import sellerCustomerMessageModel from "../models/chat/sellerCustomerMessage.js";
import adminSellerMessage from "../models/chat/adminSellerMessage.js";
import mongoose from "mongoose";

class chatController {
  // 1. Add Customer to Seller's Friend List
  addCustomerFriend = async (req, res) => {
    const { sellerId, userId } = req.body;

    try {
      if (!userId) return res.status(400).json({ error: "Missing userId" });

      if (sellerId) {
        const seller = await sellerModel.findById(sellerId);
        const user = await customerModel.findById(userId);
        if (!seller || !user)
          return res.status(404).json({ error: "Seller or User not found" });

        // Ensure user document exists
        let userDoc = await sellerCustomerModel.findOne({ myId: userId });
        if (!userDoc) {
          userDoc = await sellerCustomerModel.create({
            myId: userId,
            myFriends: [],
          });
        }

        // Add seller to user's friend list
        const alreadyFriendSeller = userDoc.myFriends.find(
          (f) => f.fdId === sellerId
        );
        if (!alreadyFriendSeller) {
          await sellerCustomerModel.updateOne(
            { myId: userId },
            {
              $push: {
                myFriends: {
                  fdId: sellerId,
                  name: seller.shopInfo?.shopName,
                  image: seller.image,
                },
              },
            }
          );
        }

        // Ensure seller document exists
        let sellerDoc = await sellerCustomerModel.findOne({ myId: sellerId });
        if (!sellerDoc) {
          sellerDoc = await sellerCustomerModel.create({
            myId: sellerId,
            myFriends: [],
          });
        }

        // Add user to seller's friend list
        const alreadyFriendCustomer = sellerDoc.myFriends.find(
          (f) => f.fdId === userId
        );
        if (!alreadyFriendCustomer) {
          await sellerCustomerModel.updateOne(
            { myId: sellerId },
            {
              $push: {
                myFriends: {
                  fdId: userId,
                  name: user.name,
                  image: "",
                },
              },
            }
          );
        }

        // Fetch chat messages
        const messages = await sellerCustomerMessageModel.find({
          $or: [
            { senderId: userId, receverId: sellerId },
            { senderId: sellerId, receverId: userId },
          ],
        });

        const updatedUserDoc = await sellerCustomerModel.findOne({
          myId: userId,
        });
        const currentFd = updatedUserDoc.myFriends.find(
          (s) => s.fdId === sellerId
        );

        return res.status(200).json({
          myFriends: updatedUserDoc.myFriends,
          currentFd,
          messages,
        });
      } else {
        const MyFriends = await sellerCustomerModel.findOne({ myId: userId });
        return res.status(200).json({ myFriends: MyFriends?.myFriends || [] });
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  // 2. Customer Sends Message to Seller
  sendMessageCustomerToSeller = async (req, res) => {
    const { userId, text, sellerId, name } = req.body;

    if (!userId || !text || !sellerId || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const message = await sellerCustomerMessageModel.create({
        senderId: userId,
        senderName: name,
        receverId: sellerId,
        message: text,
      });

      await this._reorderFriend(userId, sellerId);
      await this._reorderFriend(sellerId, userId);

      return res.status(201).json({ message });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  // 3. Seller Sends Message to Customer
  sendMessageSellerToCustomer = async (req, res) => {
    const { senderId, text, receverId, name } = req.body;

    if (!senderId || !text || !receverId || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const message = await sellerCustomerMessageModel.create({
        senderId,
        senderName: name,
        receverId,
        message: text,
      });

      await this._reorderFriend(senderId, receverId);
      await this._reorderFriend(receverId, senderId);

      return res.status(201).json({ message });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  // 4. Get Friend List for Seller
  getCustomers = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const data = await sellerCustomerModel.findOne({ myId: sellerId });
      if (!data)
        return res.status(404).json({ error: "Friend list not found" });

      return res.status(200).json({ customers: data.myFriends });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  // 5. Get Messages Between Seller and Customer
  getCustomersMessage = async (req, res) => {
    const { customerId } = req.params;
    const sellerId = req.id;

    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: "Invalid customerId" });
    }

    try {
      const messages = await sellerCustomerMessageModel.find({
        $or: [
          { senderId: sellerId, receverId: customerId },
          { senderId: customerId, receverId: sellerId },
        ],
      });

      const currentCustomer = await customerModel.findById(customerId);

      return res.status(200).json({ messages, currentCustomer });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  getSeller = async (req, res) => {
    try {
      const seller = await sellerModel.find({});
      return res.status(200).json({ seller });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };

  sendMessageSellerToAdmin = async (req, res) => {
    const { senderId, receverId, message, senderName } = req.body;

    try {
      const messageData = await adminSellerMessage.create({
        senderId,
        receverId,
        senderName,
        message,
      });

      console.log(messageData);

      return res.status(201).json({ message: messageData });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };


  getAdminMessage = async (req, res) => {
    const { receverId } = req.params;
    const Id = ""
    try {
      const messages = await adminSellerMessage.find({
        $or: [
          { senderId: Id, receverId: receverId },
          { senderId: receverId, receverId: Id }, 
        ],
      });

      let currentSeller = {}

      if(receverId){

        currentSeller = await sellerModel.findById(receverId);
      }


      return res.status(200).json({ messages, currentSeller });
    } catch (error) {
      console.log({ error });
      return res.status(500).send("Internal Server Error");
    }
  };


  // getSellerMessage = async (req, res) => {
  //   const   receverId   = ""
  //   const  { Id } = req 
  //   try {
  //     const messages = await adminSellerMessage.find({
  //       $or: [
  //         { senderId: Id, receverId: receverId },
  //         { senderId: receverId, receverId: Id }, 
  //       ],
  //     });

       
  //     return res.status(200).json({ messages  });
  //   } catch (error) {
  //     console.log({ error });
  //     return res.status(500).send("Internal Server Error");
  //   }
  // };


  getSellerMessage = async (req, res) => {
  const receverId = ""; // support
  const Id = req.id; // seller's ID from middleware

  if (!Id) {
    return res.status(401).json({ error: "Unauthorized. Missing seller ID." });
  }

  try {
    const messages = await adminSellerMessage.find({
      $or: [
        { senderId: Id, receverId },
        { senderId: receverId, receverId: Id },
      ],
    });

    return res.status(200).json({ messages });
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error");
  }
};



  // 🔁 Utility: Reorder recent friend to top
  _reorderFriend = async (ownerId, friendId) => {
    const data = await sellerCustomerModel.findOne({ myId: ownerId });
    if (!data) return;

    const myFriends = [...data.myFriends];
    const index = myFriends.findIndex((f) => f.fdId === friendId);

    if (index > 0) {
      const [target] = myFriends.splice(index, 1);
      myFriends.unshift(target);

      await sellerCustomerModel.updateOne({ myId: ownerId }, { myFriends });
    }
  };
}

export default new chatController();
