import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckOutForm from "../components/CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function Stripe({ price, orderId }) {
  const [clientSecret, setClientSecret] = useState("");
  const appearance = {
    theme: "stripe",
  };

  const options = {
    appearance,
    clientSecret,
  };

  const createPayment = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/home/order/createPayment`,
        { price },
        { withCredentials: true }
      );

      setClientSecret(data.clientSecret);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div >
      {clientSecret ? (
        <Elements options={options } stripe={stripePromise} >
          <CheckOutForm orderId={orderId}  />
        </Elements>
      ) : (
        <div className="w-full px-4 py-8 bg-white shadow-sm mt-5 rounded-sm">
          <button
            onClick={createPayment}

            className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white"
          >
            Start Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Stripe;
