import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getSellerOrders } from "../../store/Reducers/orderReducer";

function Orders() {
  const dispatch = useDispatch();
  const { totalOrder, myOrders } = useSelector((state) => state.order);
   const { userInfo } = useSelector(state => state.auth)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId : userInfo._id
    };

    dispatch(getSellerOrders(obj));
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#6f6f70] text-lg font-semibold ">Orders</h1>
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2]  ">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

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
                 Date
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d._id}
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    Rs  {d.price}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span className="px-2 py-1 text-xs  text-red-500 font-bold bg-red-100 rounded-md ">
                     {d.paymentStatus}
                    </span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span className="px-2 py-1 text-xs  text-red-500 font-bold bg-red-100 rounded-md ">
                      {d.deliveryStatus}
                    </span>
                  </td>
                   <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    
                      {d.date}
                     
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4 ">
                      <Link
                        to={`/seller/dashboard/order/details/${d._id}`}
                        className="p-[6px]  bg-green-500  rounded hover:shadow-lg hover text-[#6f6f70] "
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
         
       {totalOrder > parPage ? (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4 ">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrder}
              parPage={parPage}
              showItem={4}
            />
          </div>
        ) : (
          ""
        )}

      </div>
    </div>
  );
}

export default Orders;
