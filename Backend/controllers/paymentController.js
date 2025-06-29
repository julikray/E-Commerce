import Stripe from "stripe";
import stripeModel from "../models/stripeModel.js";
import sellerModel from "../models/sellerModel.js";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const baseUrl = process.env.BASE_URL;

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
}

export default new paymentController();
