import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import logo from "../assets/image/box.png";
import Stripe from "./Stripe";
import { useLocation } from "react-router-dom";

function Payment() {
    
  const {state : {price , items , orderId } } = useLocation()  
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee] ">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 ">
          <div className="flex flex-wrap md:flex-col ">
            <div className="w-7/12 md:w-full">
              <div className="pr-2 md:pr-2">
                <div className="flex flex-wrap">
                  <div
                  onClick={()=> setPaymentMethod('stripe')}
                    className={`w-[20%] border cursor-pointer py-8 px-12 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center ">
                      <img src={logo} alt="stripe" />
                      <span className="text-slate-600">Stripe</span>
                    </div>
                  </div>

                   <div
                    onClick={()=> setPaymentMethod('razopay')}
                    className={`w-[20%] border cursor-pointer py-8 px-12 ${
                      paymentMethod === "razopay" ? "bg-white" : "bg-slate-100"
                    } `}
                  >
                    <div className="flex flex-col gap-[3px] justify-center items-center ">
                      <img src={logo} alt="stripe" />
                      <span className="text-slate-600">Razopay</span>
                    </div>
                  </div>




                </div>

                
                    {
                        paymentMethod === 'stripe' && <div>
                            <Stripe orderId={orderId} price={price} />
                        </div>
                    }
                    {
                        
                        paymentMethod === 'razopay' &&   <div className="w-full px-4 py-8 bg-white shadow-sm mt-5 rounded-sm  " >
                        <button className="px-10 py-[6px] rounded-sm hover:shadow-orange-500/20 hover:shadow-lg bg-orange-500 text-white  " >Pay Now</button>

                    </div>

                    }


              </div>
            </div>

            <div className="w-5/12 md:w-full " >
            <div className="pl-2 md:pl-0 md:mb-0 " >
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3 " >
                    <h2>Order Summary </h2>
                    <div className="flex justify-between items-center " >
                        <span>{items} items and shipping fee included </span>
                        <span>{price} </span>
                    </div>

                    <div className="flex justify-between items-center font-semibold " >
                        <span>Total Amount</span>
                        <span className="text-lg text-orange-500 " >Rs {price} </span>

                    </div>

                </div>
            </div>

            </div>


          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Payment;
