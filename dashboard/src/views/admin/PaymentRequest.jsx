import React, { forwardRef } from "react";
import { FixedSizeList as List } from 'react-window';
import { useDispatch, useSelector } from "react-redux";
import {
    confirmPaymentRequest,
    getPaymentRequest,
  getSellerPaymentDetails,
  messageClear,
  sendWithdrawalRequest,
} from "../../store/Reducers/paymentReducer";
import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";

function handleOnWheel({deltaY}) {
    console.log('handleOmWheel' , deltaY)
}

const outerElementType = forwardRef((props , ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

function PaymentRequest() {

     const dispatch = useDispatch();
      const {successMessage,errorMessage, loader, loaderPaymentId , pendingWithdrawal } = useSelector((state) => state.payment);

    


    const Row = ({index , style}) => {
        return (
            <div style={style} className="flex text-sm text-[#6f6f70]" >
                <div className="w-[25%] p-2 whitespace-nowrap " >{index + 1} </div>
                <div className="w-[25%] p-2 whitespace-nowrap " >Rs {pendingWithdrawal[index]?.amount} </div>
                <div className="w-[25%] p-2 whitespace-nowrap " >
                <span className="px-2 py-1 text-xs text-green-500 font-bold bg-green-100 rounded-md " >{pendingWithdrawal[index]?.status}</span>
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap " > { moment(pendingWithdrawal[index]?.createdAt).format('LL') }  </div>
                <div className="w-[25%] p-2 whitespace-nowrap " >
                    <button disabled={loader} onClick={()=> confirmRequest(pendingWithdrawal[index]?._id)} className="px-2 py-1 text-xs text-blue-500 font-bold bg-blue-100 rounded-md" >
                        {(loaderPaymentId === pendingWithdrawal[index]?._id) ? "loading...." : "Confirm" }
                    
                        
                    </button>
                </div>

            </div>
        )
    }

    useEffect(() => {
        dispatch(getPaymentRequest())
    },[])
    const [paymentId , setPaymentId] = useState('')

    const confirmRequest = (id) =>{
        setPaymentId(id)
        // dispatch(confirmPaymentRequest(id))
        dispatch(confirmPaymentRequest( id ))
    }


      useEffect(() => {
        if (successMessage) {
          toast.success(successMessage);
          dispatch(messageClear());
        }
    
        if (errorMessage) {
          toast.error(errorMessage);
          dispatch(messageClear());
        }
      }, [successMessage, errorMessage]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 bg-[#fefeff]  rounded-md border border-[#d2d3d2] ">

        <h2 className="text-xl font-medium pb-5 text-[#6f6f70] " >With Request</h2>
        <div className="w-full">
            <div className="w-full overflow-x-auto" >
                <div className="flex text-[#6f6f70] border-b border-[#d2d3d2] uppercase text-xs font-bold min-w-[340px] rounded-md " >
                    <div className="w-[25%] p-2 " >No</div>
                    <div className="w-[25%] p-2 " >Amount</div>
                    <div className="w-[25%] p-2 " >Status</div>
                    <div className="w-[25%] p-2 " >Date</div>
                    <div className="w-[25%] p-2 " >Action</div>

                </div>

                {
                     <List style={{minWidth : '340px'}}
                     className="List"
                     height={350}
                     itemCount={pendingWithdrawal.length}
                     itemSize={35}
                     outerElementType={outerElementType}
                     
                     >
                        {Row}
                     </List>
                }

            </div>
        </div>


      </div>
    </div>
  ); 
}

export default PaymentRequest;
