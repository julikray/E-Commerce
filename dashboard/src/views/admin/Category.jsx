import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaImage } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PropagateLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import toast from 'react-hot-toast';
import {
  categoryAdd,
  messageClear,
  getCategory
} from "../../store/Reducers/categoryReducer.js";

function Category() {

  const dispatch = useDispatch();

  const { loader, errorMessage, successMessage ,categorys } = useSelector(
    (state) => state.category
  );

  const [parPage, setParPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [imageShow, setImage] = useState("");

  const [state, setState] = useState({
    name: "",
    image: "",
  });

  const imageHandle = (e) => {
    let files = e.target.files;
    if (files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
      setState({
        ...state,
        image: files[0],
      });
    }
  };

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  const add_category = (e) => {
    e.preventDefault();
    dispatch(categoryAdd(state));
    // console.log(state)
  };


   useEffect(()=>{
        if(successMessage){
          toast.success(successMessage)
          dispatch(messageClear())
          setState({
            name : '',
            image:''
          })  
          setImage('')
        }
          if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
          }
        },[errorMessage , successMessage])


        useEffect(() => {
          const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
          }
          dispatch(getCategory(obj) )
        },[searchValue , currentPage , parPage])

 
  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="flex flex-wrap w-full ">
        <div className="w-full lg:w-7/12">
          <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] ">
            
             <Search
                      setParPage={setParPage}
                      setSearchValue={setSearchValue}
                      searchValue={searchValue}
                    />

            <div className="relative overflow-x-auto ">
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
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  { categorys.map((d, i) => (
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
                          className=" w-[45px]  h-[45px]"
                          src={d.image}
                          alt="Logo"
                        />
                      </td>

                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                       {d.name}
                      </td>
                      <td
                        scope="row"
                        className="py-1 px-4 font-medium whitespace-nowrap"
                      >
                        <div className="flex justify-start items-center gap-4 ">
                          <Link className="p-[6px]  bg-[#eeefee] rounded hover:shadow-lg hover text-[#6f6f70] ">
                            <FaEdit />
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

        <div className="w-full lg:w-5/12 ">
          <div className="w-full pl-5">
            <div className="bg-[#fefeff] h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#6f6f70] border border-[#d2d3d2] ">
              <h1 className="text-[#6f6f70] font-semibold text-xl mb-4 w-full text-center ">
                Add Category
              </h1>
              <form onSubmit={add_category}>
                <div className="flex flex-col w-full gap-1 mb-3 ">
                  <label htmlFor="name">Category Name</label>
                  <input
                    value={state.name}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#000000] "
                    type="text"
                    id="name"
                    name="category_name"
                    placeholder="Category Name"
                  />
                </div>
                <div>
                  <label
                    className="flex justify-center items-center flex-col h-[238px] cursor-pointer border border-dashed hover:border-red-500 w-full border-[#6f6f70] mb-3 "
                    htmlFor="image"
                  >
                    {imageShow ? (
                      <img className="w-full h-full" src={imageShow} />
                    ) : (
                      <>
                        <span>
                          <FaImage />
                        </span>
                        <span>Select Image</span>
                      </>
                    )}
                  </label>
                  <input
                    onChange={imageHandle}
                    className="hidden"
                    type="file"
                    name="image"
                    id="image"
                  />

                  <div>
                    <button
                      disabled={loader ? true : false}
                      className="bg-red-500 w-full hover:shadow-red-300/50  text-white rounded-md px-7 py-2 mb-3 cursor-pointer"
                    >
                      {loader ? (
                        <PropagateLoader
                          color="#fff"
                          cssOverride={overrideStyle}
                        />
                      ) : (
                        "Add category"
                      )}
                    </button>
                  </div>
                </div>
                {/* <button className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 " >Add category</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
