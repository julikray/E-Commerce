import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import error from "../assets/image/error.png";
import success from "../assets/image/correct.png";
import { FadeLoader } from "react-spinners";
import axios from 'axios';
import { Link } from "react-router-dom";

const load = async () => {
  return await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
};

function ConfirmOrder() {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;

        case "processing":
          setMessage("processing");
          break;
        case "requires_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);

  const getLoad = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };

  useEffect(() => {
    getLoad();
  }, []);

  const updatePayment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/home/order/confirm/${orderId}`
        );
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data);
        } else {
          console.log("An error occurred:", error.message || error);
        }
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      updatePayment();
    }
  }, [message]);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4 ">
      {message === "failed" || message === "processing" ? (
        <>
          <img className="w-30" src={error} alt="error logo" />
          <Link
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
            to="/dashboard/myOrders"
          >
           
            Back to Dashboard 
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <img className="w-30" src={success} alt="success logo" />
            <Link
              className="px-5 py-2 bg-green-500 rounded-sm text-white"
              to="/dashboard/myOrders"
            >
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
}

export default ConfirmOrder;
