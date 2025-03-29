import React from "react";
import logo from "../../assets/image/logo.png";

function OrdersDetails() {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] ">
        <div className="flex justify-between items-center p-4 ">
          <h2 className="text-xl text-[#6f6f70] ">Order Details</h2>

          <select
            name=""
            id=""
            className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#eeefee]  border border-slate-700 rounded-md text-[#6f6f70] "
          >
            <option value="5">pending</option>
            <option value="10">processing</option>
            <option value="20">warehouse</option>
            <option value="20">placed</option>
            <option value="20">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#6f6f70] ">
            <h2>#34344</h2>
            <span>3 Jan 2024</span>
          </div>

          <div className="flex flex-wrap">
            <div className="w-[30%] ">
              <div className="pr-3 text-[#6f6f70] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">Deliver To : Raju Kahn</h2>
                  <p>
                    <span className="text-sm">
                      Cecillia ChapmanNulla St. Mankato Mississippi
                    </span>
                  </p>
                </div>

                <div className="flex justify-start items-center gap-3  ">
                  <h2>Payment Status :</h2>
                  <span className="text-base">Paid</span>
                </div>
                <span>Price : Rs 232</span>

                <div className="mt-4 flex flex-col gap-4 bg-[#eeefee] rounded-md border border-[#d2d3d2] ">
                  <div className="text-[#6f6f70] ">
                    <div className="flex gap-3 text-md">
                      <img
                        className="  w-[45px]  h-[45px]  bg-amber-50  "
                        src={logo}
                        alt="Logo"
                      />

                      <div>
                        <h2>Product Name here</h2>
                        <p>
                          <span>Brand : </span>
                          <span>Easy</span>
                          <span className="text-lg" >Quantity : 3</span>
                        </p>
                      </div>

                    </div>

                  </div>
                </div>
              </div>


            </div>
              <div className="w-[70%] " >
                <div className="pl-3" >
                  <div className="mt-4 p-4 flex flex-col bg-[#eeefee] rounded-md border border-[#d2d3d2]" >
                    <div className="text-[#6f6f70] mt-2" >
                      <div className="flex justify-start items-center gap-3" >
                        <h2>Seller 1 Order : </h2>
                        <span>pending</span>
                      </div>
                      <div className="flex gap-3 text-md mt-2">
                      <img
                        className="  w-[45px]  h-[45px]  bg-amber-50  "
                        src={logo}
                        alt="Logo"
                      />

                      <div>
                        <h2>Product Name here</h2>
                        <p>
                          <span>Brand : </span>
                          <span>Easy</span>
                          <span className="text-lg" >Quantity : 3</span>
                        </p>
                      </div>

                    </div>

                    </div>

                    <div className="text-[#6f6f70] mt-2" >
                      <div className="flex justify-start items-center gap-3" >
                        <h2>Seller 1 Order : </h2>
                        <span>pending</span>
                      </div>
                      <div className="flex gap-3 text-md mt-2">
                      <img
                        className="  w-[45px]  h-[45px]  bg-amber-50  "
                        src={logo}
                        alt="Logo"
                      />

                      <div>
                        <h2>Product Name here</h2>
                        <p>
                          <span>Brand : </span>
                          <span>Easy</span>
                          <span className="text-lg" >Quantity : 3</span>
                        </p>
                      </div>

                    </div>

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
