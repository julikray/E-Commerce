import React, { useState } from "react";
import { CgArrowDownR } from "react-icons/cg";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);
  const [show , setShow] = useState(false)

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 bg-[#fefeff]  rounded-md border border-[#d2d3d2] ">
        <div className="flex justify-between items-center ">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <input
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
            type="text"
            placeholder="search"
          />
        </div>
        

        <div className="relative mt-5 overflow-x-auto ">
          <div className="w-full text-sm text-left [#d0d2d6] ">
            <div className="text-sm text-[#6f6f70] uppercase border-b border-[#d2d3d2]">
              <div className="flex justify-between items-center ">
                <div className="py-3 w-[25%] font-bold ">Order id</div>
                <div className="py-3 w-[13%] font-bold ">Price</div>
                <div className="py-3 w-[18%] font-bold ">Payment Status</div>
                <div className="py-3 w-[18%] font-bold ">Order Status</div>
                <div className="py-3 w-[18%] font-bold ">Action</div>
                <div className="py-3 w-[8%] font-bold ">
                  <CgArrowDownR />
                </div>
              </div>
            </div>

            


            <div className=" text-[#6f6f70] ">
              <div className="flex justify-between items-start  ">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap ">#34535</div>
                <div className="py-3 w-[13%] font-medium  ">Rs 4555</div>
                <div className="py-3 w-[18%] font-medium  ">
                  <span className="px-2 py-1 text-xs text-green-500 font-bold bg-green-100 rounded-md " >Pending</span>
                  </div>
                  <div className="py-3 w-[18%] font-medium  ">
                  <span className="px-2 py-1 text-xs text-green-500 font-bold bg-green-100 rounded-md " >Pending</span>
                  </div>
                <div className="py-3 w-[18%] font-medium  "> 
                    <Link to='/admin/dashboard/order/details/2' >View</Link>
                </div>
                <div onClick={(e) => setShow(!show) } className="py-3 w-[8%] font-medium ">
                  <CgArrowDownR />
                </div>
              </div>

              <div className={show ? 'block  bg-[#eeefee] ' : 'hidden' } >

              <div className="flex justify-start items-start  ">
                <div className="py-3 w-[25%] font-medium whitespace-nowrap pl-3 ">#34535</div>
                <div className="py-3 w-[13%] font-medium  ">Rs 4555</div>
                <div className="py-3 w-[18%] font-medium  ">
                  <span className="px-2 py-1 text-xs text-green-500 font-bold bg-green-100 rounded-md " >Pending</span>
                  </div>
                  <div className="py-3 w-[18%] font-medium  ">
                  <span className="px-2 py-1 text-xs text-green-500 font-bold bg-green-100 rounded-md " >Pending</span>
                  </div>
                </div>


              </div>






            </div>





          </div>
        </div>
        
        <div className="w-full flex justify-end mt-4 bottom-4 right-4 " >
        <Pagination
        pageNumber = {currentPage}
        setPageNumber = {setCurrentPage}
        totalItem = {50}
        parPage= {parPage}
        showItem = {3}   
        />

        </div>

      </div>
    </div>
  );
}

export default Orders;
