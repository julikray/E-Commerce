import Stripe from "stripe";
import stripeModel from "../models/stripeModel.js";
import sellerModel from "../models/sellerModel.js";
import sellerWallet from "../models/sellerWallet.js"
import { v4 as uuidv4 } from "uuid";
import Withdrawal from "../models/withdrawalReq.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.BASE_URL;

function sumAmount(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].amount;
  }
  return sum;
}

class paymentController {
  // async createStripeConnectAccount(req, res) {
  //     const {id } = req
  //     const uuid = uuidv4()
  //     try {
  //         const stripeInfo = await stripeModel.findOne({ sellerId : id})

  //         if(stripeInfo) {
  //             await stripeModel.deleteOne({sellerId : id})

  //              const account = await stripe.accounts.create({ type: 'express' })

  //             const accountLink = await stripe.accounts.create({
  //                 account: account.id,
  //                 refresh_url : "http://localhost:4000/refresh",
  //                 return_url : `"http://localhost:4000/success?activeCode = ${uuid}`,
  //                 type : 'account_onboarding'
  //             })
  //              await stripeModel.create({
  //             sellerId:id,
  //             stripeId:account.id,
  //             code: uuid
  //         })
  //           res.status(201).json({ url : accountLink.url });

  //         } else {

  //             const account = await stripe.accounts.create({ type: 'express' })

  //              const accountLink = await stripe.accounts.create({
  //                 account: account.id,
  //                 refresh_url : "http://localhost:4000/refresh",
  //                 return_url : `"http://localhost:4000/success?activeCode = ${uuid}`,
  //                 type : 'account_onboarding'
  //             })
  //              await stripeModel.create({
  //             sellerId:id,
  //             stripeId:account.id,
  //             code: uuid
  //         })
  //           res.status(201).json({ url : accountLink.url });

  //         }

  //     } catch (error) {
  //         console.error('Stripe Error:', error);
  //         res.status(500).json({ error: 'Something went wrong' });
  //     }
  // }

  async createStripeConnectAccount(req, res) {
    const { id } = req;
    const uuid = uuidv4();

    try {
      const existing = await stripeModel.findOne({ sellerId: id });

      if (existing) {
        await stripeModel.deleteOne({ sellerId: id });
      }

      const account = await stripe.accounts.create({ type: "express" });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${baseUrl}/refresh`,
        return_url: `${baseUrl}/success?activeCode=${uuid}`,
        type: "account_onboarding",
      });

      await stripeModel.create({
        sellerId: id,
        stripeId: account.id,
        code: uuid,
      });

      res.status(201).json({ url: accountLink.url });
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  async activeStripeConnectAccount(req, res) {
    const { activeCode } = req.params;
    const { id } = req;

    try {
      const userStripeInfo = await stripeModel.findOne({ code: activeCode });

      if (userStripeInfo) {
        await sellerModel.findByIdAndUpdate(id, {
          payment: "active",
        });

        res.status(200).json({ message: "payment active" });
      } else {
        res.status(404).json({ message: "payment active failed" });
      }
    } catch (error) {
      console.error("Stripe Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }


 


  async getSellerPaymentDetails(req, res) {

    const {sellerId} = req.params

    // console.log(req.params)

    try {
      // const amount = await sellerWallet.aggregate([
      //   {
      //     $match: {
      //       sellerId: {
      //         $eq: sellerId
      //       }
      //     }
      //   },{
      //     $group: {
      //       _id : null , 
      //       totalAmount : {
      //         $sum : '$amount'
      //       }
      //     }
      //   }
      // ])

      const payment = await sellerWallet.find({sellerId})
      const pendingWithdrawal = await Withdrawal.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId
            }
          }, {
            status: {
              $eq: 'pending'
            }
          }
        ]
      })

       const successWithdrawal = await Withdrawal.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId
            }
          }, {
            status: {
              $eq: 'success'
            }
          }
        ]
      })

      const pendingAmount = sumAmount(pendingWithdrawal)
      const withDrawalAmount = sumAmount(successWithdrawal)
      const totalAmount = sumAmount(payment)
      let availableAmount = 0;

      if(totalAmount > 0 ){
        availableAmount = totalAmount - (pendingAmount - withDrawalAmount )

      }


      res.status(200).json({ totalAmount , pendingAmount , withDrawalAmount , availableAmount , successWithdrawal , pendingWithdrawal  });

    } catch (error) {
       console.error( error);
      res.status(500).json({ message: "Internal server error" });
      
    }



  }


  async  sendWithdrawalRequest (req , res) {
    const { amount , sellerId } = req.body

    console.log(req.body)
    try {
      const withdrawal = await Withdrawal.create({
        sellerId,
        amount: parseInt(amount)
      })
      console.log(withdrawal)
      res.status(200).json({ withdrawal , message: 'Withdrawal request send' });
    } catch (error) {
      console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }

  }


}

export default new paymentController();
