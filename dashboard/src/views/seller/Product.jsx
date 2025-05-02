import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import Pagination from "../Pagination";
import { FaEdit, FaImage, FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, messageClear } from "../../store/Reducers/productReducer.js";

function Product() {


  const dispatch = useDispatch();

  const { products , totalProduct} = useSelector(
    (state) => state.product
  );


  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);


  
  // useEffect(()=>{
  //   if(successMessage){
  //     toast.success(successMessage)
  //     dispatch(messageClear())
  //     setState({
  //       name : '',
  //       image:''
  //     })  
  //     setImage('')
  //   }
  //     if(errorMessage){
  //       toast.error(errorMessage)
  //       dispatch(messageClear())
  //     }
  //   },[errorMessage , successMessage])


    useEffect(() => {
      const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
      }
      dispatch(getProduct(obj) )
    },[searchValue , currentPage , parPage])

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#6f6f70] text-lg font-semibold ">Add Product</h1>
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
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((d, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i+1}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="  w-[45px]  h-[45px]  bg-amber-50  "
                      src={d.images}
                      alt="Logo"
                    />
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d?.name.slice(0.15)}...
                  </td>

                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.category}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.brand}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                   {d.price}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {
                    d.discount === 0 ? <span>No Discount</span> : <span>{d.discount}% </span>
                   }
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d.stock}
                   
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-center gap-4 ">
                      <Link to={`/seller/dashboard/edit-product/${d._id}`} className="p-[6px]  bg-[#f1ef5e] rounded hover:shadow-lg hover text-[#6f6f70] ">
                        <FaEdit />
                      </Link>
                      <Link to={`/seller/dashboard/addProduct`} className="p-[6px]  bg-green-500  rounded hover:shadow-lg hover text-[#6f6f70] ">
                        <FaEye />
                      </Link>
                      <Link className="p-[6px]  bg-red-500  rounded hover:shadow-lg hover text-[#6f6f70] ">
                        {" "}
                        <RiDeleteBin6Line />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       {
        totalProduct <= parPage ? '' :  <div className="w-full flex justify-end mt-4 bottom-4 right-4 ">
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

export default Product;
