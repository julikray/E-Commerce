import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import { getSellerReq } from "../../store/Reducers/sellerReducer";

function SellerRequest() {
  const dispatch = useDispatch();

  const { sellers, totalSeller } = useSelector((state) => state.seller);

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   dispatch(getSellerReq({
  //     parPage,
  //     searchValue,
  //     page:currentPage
  //   }));
  // }, [searchValue, currentPage, parPage]);

    useEffect(() => {
            const obj = {
              parPage: parseInt(parPage),
              page: parseInt(currentPage),
              searchValue
            }
            dispatch(getSellerReq(obj) )
          },[searchValue , currentPage , parPage])

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] ">
        {/* <div className="flex justify-between items-center ">
          <select
            onChange={(e) => setParPage(parseInt(e.target.value))}
            className="px-4 py-2 hover:border-indigo-500 outline-none bg-[#eeefee]  border border-slate-700 rounded-md text-[#6f6f70] "
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
        </div> */}
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <div className="relative mt-5 overflow-x-auto ">
          <div className="w-full text-sm text-left [#d0d2d6] ">
            <div className="text-sm text-[#6f6f70]   ">
              <table className="w-full text-sm text-left text-[#6f6f70]  ">
                <thead className="text-sm text-[#6f6f70]  border-b border-[#d2d3d2] uppercase ">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      No
                    </th>

                    <th scope="col" className="py-3 px-4">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Email
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Payment Status
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {
                  
                  sellers.map((d, i) => (
                    <tr key={i}>
                      <td
                        scope="row"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        {i+1}
                      </td>

                      <td
                        scope="row"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        {d.name}
                      </td>

                      <td
                        scope="row"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        {d.email}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        {d.payment}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        {d.status}
                      </td>
                      <td
                        scope="row"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4 ">
                          <Link
                            to= {`/admin/dashboard/seller/details/${d._id}`}
                            className="p-[6px]  bg-green-400  rounded hover:shadow-lg   "
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {
          totalSeller <= parPage ? "" :  <div className="w-full flex justify-end mt-4 bottom-4 right-4 ">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
        }

       


      </div>
    </div>
  );
}

export default SellerRequest;
