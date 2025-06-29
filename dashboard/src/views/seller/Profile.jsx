import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import { FadeLoader } from "react-spinners";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  messageClear,
  profile_image_upload,
  profileInfoAdd,
} from "../../store/Reducers/authReducer";
import toast from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import { createStripeConnectAccount } from "../../store/Reducers/sellerReducer";

function Profile() {
  const [state, setState] = useState({
    division: "",
    district: "",
    shopName: "",
    sub_district: "",
  });

  const dispatch = useDispatch();

  const { userInfo, loader, successMessage } = useSelector(
    (state) => state.auth
  );

 

  const add_image = (e) => {
    if (e.target.files.length > 0) {
      console.log(e.target.files[0]);
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      dispatch(profile_image_upload(formData));
    }
  }; /// error

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const add =(e) =>{
    e.preventDefault()
    dispatch(profileInfoAdd(state))
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      messageClear();
    }
  }, [successMessage]);

  const overrideStyle = {
    display: "flex",
    margin: "0 auto",
    height: "24px",
    justifyContent: "center",
    alignItem: "center",
  };

  return (
    <div className="px-2 lg:px-7 py-5 ">
      <div className="w-full flex flex-wrap ">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4 bg-[#fefeff] rounded-md border border-[#d2d3d2] text-[#6f6f70] ">
            <div className="flex justify-center items-center py-3">
              {userInfo?.image ? (
                <label
                  htmlFor="img"
                  className="h-[150px] w-[200px] relative p-3 cursor-pointer overflow-hidden "
                >
                  <img
                    className="bg-red-500 w-full h-full"
                    src={userInfo.image}
                    alt="Logo"
                  />

                  {loader && (
                    <div className="bg-[#6f6f70] absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20 ">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              ) : (
                <label
                  className="flex justify-center items-center flex-col h-[150px] cursor-pointer border border-dashed hover:border-red-500 w-[200px] border-[#6f6f70] mb-3 relative "
                  htmlFor="img"
                >
                  <span>
                    <FaImage />
                  </span>
                  <span>Select Image</span>

                  {loader && (
                    <div className="bg-[#6f6f70] absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20 ">
                      <span>
                        <FadeLoader />
                      </span>
                    </div>
                  )}
                </label>
              )}

              <input
                onChange={add_image}
                type="file"
                className="hidden"
                id="img"
              />
            </div>

            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 border border-[#cfcfcf]  rounded-md relative ">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer ">
                  <FaEdit />
                </span>

                <div className="flex gap-2 text-[#6f6f70]  ">
                  <span>Name : </span>
                  <span>{userInfo.name} </span>
                </div>

                <div className="flex gap-2 text-[#6f6f70]  ">
                  <span>Email : </span>
                  <span>{userInfo.email} </span>
                </div>
                <div className="flex gap-2 text-[#6f6f70]  ">
                  <span>Role : </span>
                  <span>{userInfo.role} </span>
                </div>
                <div className="flex gap-2 text-[#6f6f70]  ">
                  <span>Status : </span>
                  <span>{userInfo.status} </span>
                </div>
                <div className="flex gap-2 text-[#6f6f70]  ">
                  <span>Payment Account : </span>
                  <p>
                    {userInfo.payment === "active" ? (
                      <span className="cursor-pointer px-2 py-1 text-xs text-red-500 font-bold bg-red-100 rounded-md ml-2">
                        {userInfo.payment}
                      </span>
                    ) : (
                      <span onClick={() => dispatch(createStripeConnectAccount())} className="bg-blue-500 text-white text-xs cursor-pointer font-normal ml-2 px-2 py-0.5 rounded ">
                        Click Active
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-0 md:px-5 py-2 ">
              {!userInfo?.shopInfo ? (
                <form onSubmit={add} >
                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="Shop">Shop Name</label>
                    <input
                      value={state.shopName}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                      type="text"
                      name="shopName"
                      id="Shop"
                      placeholder="Shop Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="division">Division Name</label>
                    <input
                      value={state.division}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                      type="text"
                      name="division"
                      id="division"
                      placeholder="division Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-2">
                    <label htmlFor="district">District Name</label>
                    <input
                      value={state.district}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                      type="text"
                      name="district"
                      id="district"
                      placeholder="District Name"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1 mb-4">
                    <label htmlFor="subdis">Sub District </label>
                    <input
                      value={state.sub_district}
                      onChange={inputHandle}
                      className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                      type="text"
                      name="subdis"
                      id="subdis"
                      placeholder="Sub District Name"
                    />
                  </div>

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
                      "Save Changes"
                    )}
                  </button>
                </form>
              ) : (
                <div className="flex justify-between text-sm flex-col gap-2 p-4 border border-[#cfcfcf]  rounded-md relative ">
                  <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer ">
                    <FaEdit />
                  </span>

                  <div className="flex gap-2 text-[#6f6f70]  ">
                    <span>Shop Name : </span>
                    <span>{ userInfo.shopInfo?.shopName } </span>
                  </div>

                  <div className="flex gap-2 text-[#6f6f70]  ">
                    <span>Division : </span>
                    <span>{ userInfo.shopInfo?.division } </span>
                  </div>
                  <div className="flex gap-2 text-[#6f6f70]  ">
                    <span>District : </span>
                    <span> { userInfo.shopInfo?.district }  </span>
                  </div>
                  <div className="flex gap-2 text-[#6f6f70]  ">
                    <span>Sub District : </span>
                    <span> { userInfo.shopInfo?.sub_district }  </span>
                  </div>
               
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0  ">
            <div className=" bg-[#fefeff] rounded-md border border-[#d2d3d2] text-[#6f6f70] p-4">
              <h1 className="text-[#6f6f70] text-lg mb-3 font-semibold ">
                Change Password
              </h1>

              <form>
                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="Shop">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Old Password"
                  />
                </div>

                <div className="flex flex-col w-full gap-1 mb-2">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#eeefee] border border-slate-700 rounded-md text-[#6f6f70] "
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                  />
                </div>

                <button className="bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 ">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
