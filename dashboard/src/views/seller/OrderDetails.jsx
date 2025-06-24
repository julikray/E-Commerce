import React, { useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerOrdersDetails,
  messageClear,
  sellerOrderStatusUpdate,
} from "../../store/Reducers/orderReducer";
import toast from "react-hot-toast";

function OrdersDetails() {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  const { order, errorMessage, successMessage } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getSellerOrdersDetails(orderId));
  }, [orderId]);

  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order?.deliveryStatus);
  }, [order]);

  const statusUpdate = (e) => {
    dispatch(
      sellerOrderStatusUpdate({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] ">
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-xl text-[#6f6f70] ">Order Details</h2>

          <select
            onChange={statusUpdate}
            value={status}
            name=""
            id=""
            className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#eeefee]  border border-slate-700 rounded-md text-[#6f6f70] "
          >
            <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#6f6f70] ">
            <h2>#{order._id} </h2>
            <span> {order.date} </span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-[30%] ">
              <div className="pr-3 text-[#6f6f70] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order.shippingInfo}
                  </h2>
                </div>

                <div className="flex justify-start items-center gap-3  ">
                  <h2>Payment Status :</h2>
                  <span className="text-base">{order.paymentStatus}</span>
                </div>
                <span>Price : Rs {order.price}</span>

                <div className="mt-4 flex flex-col gap-4 bg-[#eeefee] rounded-md border border-[#d2d3d2] ">
                  <div className="text-[#6f6f70] flex flex-col gap-8 ">
                    {order.products &&
                      order.products.map((p, i) => (
                        <div key={i} className="flex gap-3 text-md">
                          <img
                            className="  w-[45px]  h-[45px]  bg-amber-50  "
                            src={p.images[0]}
                            alt="images"
                          />

                          <div>
                            <h2>Product Name here</h2>
                            <p>
                              <span>Brand : </span>
                              <span>{p.brand} , </span>
                              <span className="text-lg">
                                Quantity : {p.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersDetails;
