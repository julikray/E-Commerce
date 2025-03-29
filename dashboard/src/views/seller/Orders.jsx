import React, { useState } from 'react'
import Search from '../components/Search'
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";


function Orders() {

   const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [parPage, setParPage] = useState(5);
    

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className='text-[#6f6f70] text-lg font-semibold ' >Orders</h1>
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2]  ">
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />


        <div className="relative overflow-x-auto mt-5 ">
              <table className="w-full text-sm text-left text-[#6f6f70] ">
                <thead className="text-sm text-[#6f6f70] uppercase border-b border-[#d2d3d2] ">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                       Order Id
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Price
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Payment Status
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Order Status
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                    
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3, 4, 5].map((d, i) => (
                    <tr key={i}>
                      
                      

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                       #24244
                      </td>

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        Rs 344
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                       Pending
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        Pending
                      </td>
                     
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4 ">
                         
                          <Link className="p-[6px]  bg-green-500  rounded hover:shadow-lg hover text-[#6f6f70] ">
                            <FaEye />
                          </Link>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full flex justify-end mt-4 bottom-4 right-4 ">
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={50}
                parPage={parPage}
                showItem={3}
              />
            </div>


      </div>
      
    </div>
  )
}

export default Orders