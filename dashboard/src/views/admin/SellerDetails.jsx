import React, { useEffect, useState } from "react";
import logo from "../../assets/image/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeller, messageClear, sellerStatusUpdate } from "../../store/Reducers/sellerReducer";
import toast from "react-hot-toast";

function SellerDetails() {

  const dispatch = useDispatch();

  const { seller , successMessage } = useSelector((state) => state.seller);
  const { sellerId } = useParams()

  useEffect(() => {
    dispatch(getSeller(sellerId))
  },[sellerId])

  const [status , setStatus] = useState('')

  const submit = (e) =>{
    e.preventDefault()
    dispatch(sellerStatusUpdate({
      sellerId,
      status
      
    }))
  }

    useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        messageClear();
      }
    }, [successMessage]);

    useEffect(()=>{
      if(seller){
        setStatus(seller.status)
      }
    },[seller])


  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3 text-[#6f6f70] ">Seller details</h1>
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2]  ">
        <div className="w-full flex flex-wrap text-[#6f6f70] ">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
             {
              seller?.image ?  <img
              className="w-full  h-[230px]  bg-amber-500 "
              src={logo}
              alt="Logo"
            /> : <span>Image Not Uploaded</span>
             }
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>

              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#eeefee] rounded-md border border-[#d2d3d2]  ">
                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Name : </span>
                  <span>{ seller?.name } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Email : </span>
                  <span>{ seller?.email } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Role : </span>
                  <span>{ seller?.role } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Status : </span>
                  <span>{ seller?.status } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Payment Status : </span>
                  <span>{ seller?.payment } </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Address</h2>
              </div>

              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#eeefee] rounded-md border border-[#d2d3d2]">
                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Shop Name : </span>
                  <span>{ seller?.shopInfo?.shopName } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>Division : </span>
                  <span>{ seller?.shopInfo?.division } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>District : </span>
                  <span>{ seller?.shopInfo?.district } </span>
                </div>

                <div className="flex gap-2 font-bold text-[#000] ">
                  <span>State : </span>
                  <span>{ seller?.shopInfo?.sub_district } </span>
                </div>
              </div>
            </div>
          </div>

        </div>
        <form onSubmit={submit} >
        <div className="flex gap-4 py-3">
        <select value={status} onChange={(e)=> setStatus(e.target.value)}
            className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#eeefee] rounded-md border border-slate-700" required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
          </select>
          <button className="bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 " >Submit</button>
        </div>

        </form>
      </div>

    </div>
  );
}

export default SellerDetails;
