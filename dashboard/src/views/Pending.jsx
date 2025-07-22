import React from "react";
import { Link } from "react-router-dom";


function Pending() {
  return (
    <div>
      <div className=" flex-col p-9  ">
        <h1 className="font-bold text-2xl" >Pending Your Account</h1>
        <p className="text-md mt-4 ">
          Your account is currently pending. Please complete your profile setup
          to activate your account. Once submitted, your profile will be
          reviewed and approved by the admin. If you need help, feel free to
          connect with chat support.
        </p>
      </div>

      <div className="flex  pl-9  ">
        <button className="bg-[#fefeff] p-3 rounded-md border border-[#d2d3d2] text-[#6f6f70] ">
          <Link to="/seller/dashboard/profile" >
          Update Profile </Link>
        </button>

        <button className="bg-[#fefeff] p-3 ml-3 rounded-md border border-[#d2d3d2] text-[#6f6f70] ">
          <Link to="/seller/dashboard/chatSupport" >Chat Support</Link>
        </button>

      </div>
    </div>
  );
}

export default Pending;
