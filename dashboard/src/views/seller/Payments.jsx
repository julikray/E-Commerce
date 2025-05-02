import React, { forwardRef } from "react";
import { FixedSizeList as List } from 'react-window';
import {  FaRupeeSign } from "react-icons/fa";
 

function handleOnWheel({deltaY}) {
    console.log('handleOmWheel' , deltaY)
}

const outerElementType = forwardRef((props , ref) => (
    <div ref={ref} onWheel={handleOnWheel} {...props} />
))

function Payments() {

    const array = [1,2,3,4,5,6,7,8]
    const Row = ({index , style}) => {
        return (
            <div style={style} className="flex text-sm text-[#6f6f70]" >
                <div className="w-[25%] p-2 whitespace-nowrap " >{index + 1} </div>
                <div className="w-[25%] p-2 whitespace-nowrap " >Rs 2222</div>
                <div className="w-[25%] p-2 whitespace-nowrap " >
                <span className="px-2 py-1 text-xs  text-red-500 font-bold bg-red-100 rounded-md " >Pending</span>
                </div>
                <div className="w-[25%] p-2 whitespace-nowrap " >25 Dec 2025 </div>
             





            </div>
        )
    }

  return (
    <div className="px-2 md:px-7 py-5 ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5 ">
        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">₹ 7778</h2>
            <span className="text-md font-bold ">Total Salse</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full  flex justify-center items-center text-xl">
            <FaRupeeSign />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">₹ 20</h2>
            <span className="text-md font-bold ">Available Amount</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full  flex justify-center items-center text-xl">
            <FaRupeeSign />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">₹ 50</h2>
            <span className="text-md font-bold ">WithDrawal Amount</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <FaRupeeSign />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">₹ 0</h2>
            <span className="text-md font-bold ">Pending Amount</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <FaRupeeSign />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4 ">
        <div className=" bg-[#fefeff] p-4 rounded-md border border-[#d2d3d2">
          <h2 className="text-lg">Send Request</h2>
          <div className="pt-5 mb-5">
            <form>
              <div className="flex gap-3 flex-nowrap ">
                <input
                  min="0"
                  type="number"
                  className="px-4 py-2 md:w-[79%] focus:border-[#ae88f1] outline-none bg-[#eeefee]  border border-slate-700 rounded-md text-[#6f6f70] "
                  name="amount"
                />

                <button className="bg-red-500  hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-2 ">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="text-lg pb-4 " >Pending Request</h2>

            <div className="w-full overflow-x-auto" >
                            <div className="flex text-[#6f6f70] border-b border-[#d2d3d2] uppercase text-xs font-bold min-w-[340px] rounded-md " >
                                <div className="w-[25%] p-2 " >No</div>
                                <div className="w-[25%] p-2 " >Amount</div>
                                <div className="w-[25%] p-2 " >Status</div>
                                <div className="w-[25%] p-2 " >Date</div>
                                
            
                            </div>
            
                            {
                                 <List style={{minWidth : '340px'}}
                                 className="List"
                                 height={350}
                                 itemCount={100}
                                 itemSize={35}
                                 outerElementType={outerElementType}
                                 
                                 >
                                    {Row}
                                 </List>
                            }
            
                        </div>

          </div>





        </div>




        <div className=" bg-[#fefeff] p-4 rounded-md border border-[#d2d3d2">
          
          <div>
            <h2 className="text-lg pb-4 " >Success WithDrawal</h2>

            <div className="w-full overflow-x-auto" >
                            <div className="flex text-[#6f6f70] border-b border-[#d2d3d2] uppercase text-xs font-bold min-w-[340px] rounded-md " >
                                <div className="w-[25%] p-2 " >No</div>
                                <div className="w-[25%] p-2 " >Amount</div>
                                <div className="w-[25%] p-2 " >Status</div>
                                <div className="w-[25%] p-2 " >Date</div>
                                
            
                            </div>
            
                            {
                                 <List style={{minWidth : '340px'}}
                                 className="List"
                                 height={350}
                                 itemCount={100}
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

    </div>
  );
}

export default Payments;
