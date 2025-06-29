import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBanner, getBanner, messageClear, updateBanner } from "../../store/Reducers/bannerReducer.js";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";

function AddBanner() {
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage  , banner } = useSelector(
    (state) => state.banner
  );
  const [show, setShow] = useState();
  const { productId } = useParams();
  const [imageShow, setImageShow] = useState("");
  const [image, setImage] = useState("");

  const imageHandle = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImage(files[0]);

      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  // console.log(banner)
  // console.log(imageShow)

  const add = (e) => {
    e.preventDefault();
    console.log("productId:", productId);
    console.log("image:", image);

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", image);

    dispatch(addBanner(formData));
  };

   const update = (e) => {
    e.preventDefault(); 
    console.log("image", image);

    const formData = new FormData();
    formData.append("image", image);

    dispatch(updateBanner({info: formData , bannerId: banner._id}));
  };


  useEffect(()=>{
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
         
      setImage("")
      setImageShow("")
       
    }
      if(errorMessage){
        toast.error(errorMessage)
        dispatch(messageClear())
      }
    },[errorMessage , successMessage])

    const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };


  useEffect(()=> {
    dispatch(getBanner(productId))
  },[productId])



  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] ">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#6f6f70] text-xl font-semibold ">Add banner</h1>

          <Link
            to="/seller/dashboard/banners"
            className="bg-[#fefeff] rounded-sm border border-[#d2d3d2] px-7 py-2 text-[#6f6f70] "
          >
            Banners
          </Link>
        </div>

        {
          !banner &&  <div>
          <form onSubmit={add}>
            <div className=" mb-4">
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#6f6f70] "
                htmlFor="image"
              >
                <span>
                  <FaImage />{" "}
                </span>
                <span>Select banner Image </span>
              </label>
              <input
                required
                onChange={imageHandle}
                name="banner"
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div>
              {imageShow && (
                <div className="mb-4">
                  <img className="w-full h-auto" src={imageShow} alt="image" />
                </div>
              )}

              <button
                              disabled={loader ? true : false}
                              className="bg-red-500 w-full hover:shadow-red-300/50  text-white rounded-md px-7 py-2 mb-3 cursor-pointer"
                            >
                              {loader ? (
                                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                              ) : (
                                "Add Banner"
                              )}
                            </button>
            </div>

            {/* <div onClick={()=> setShow(!show)} className="w-full mb-4 relative " >
                <div className="w-full h-[50px] rounded-md cursor-pointer border border-slate-700 flex justify-start items-center px-4 text-[#6f6f70]  " >
                    <span>Select product</span>

                </div>
                { 
                    show  && <div className="w-full h-[300px] bg-[#eeefee] relative" >
                        <div className="p-4" >
                            <input  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] w-full" type="text" />

                        </div>

                        <div>

                        </div>


                    </div>
                }

            </div> */}
          </form>
        </div>
        }

        {
          banner &&  <div>

             { (
                <div className="mb-4">
                  <img className="w-full h-auto" src={banner.banner} alt="image" />
                </div>
              )}

          <form onSubmit={update}>
            <div className=" mb-4">
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-[#6f6f70] "
                htmlFor="image"
              >
                <span>
                  <FaImage />{" "}
                </span>
                <span>Select banner Image </span>
              </label>
              <input
                required
                onChange={imageHandle}
                name="banner"
                className="hidden"
                type="file"
                id="image"
              />
            </div>
            <div>
              {imageShow && (
                <div className="mb-4">
                  <img className="w-full h-auto" src={imageShow} alt="image" />
                </div>
              )}

              <button
                              disabled={loader ? true : false}
                              className="bg-red-500 w-full hover:shadow-red-300/50  text-white rounded-md px-7 py-2 mb-3 cursor-pointer"
                            >
                              {loader ? (
                                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                              ) : (
                                "Update Banner"
                              )}
                            </button>
            </div>

            {/* <div onClick={()=> setShow(!show)} className="w-full mb-4 relative " >
                <div className="w-full h-[50px] rounded-md cursor-pointer border border-slate-700 flex justify-start items-center px-4 text-[#6f6f70]  " >
                    <span>Select product</span>

                </div>
                { 
                    show  && <div className="w-full h-[300px] bg-[#eeefee] relative" >
                        <div className="p-4" >
                            <input  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] w-full" type="text" />

                        </div>

                        <div>

                        </div>


                    </div>
                }

            </div> */}
          </form>
        </div>
        }

       
      </div>
    </div>
  );
}

export default AddBanner;
