import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { Link } from "react-router-dom";
import Headers from '../components/Headers';
import Footer from '../components/Footer';


function Register() {
  return (

    <div>
<Headers/>
    <div className=" bg-[#eeefee] flex justify-center items-center py-3  ">
      <div className="w-[350px] text-[#6f6f70]  p-2">
        <div className="bg-[#fefeff] border border-[#d2d3d2] p-4 rounded-md shadow-sm ">
          <h2 className="text-xl mb-3 font-bold">Welcome to E-commerce</h2>
          <p className="text-sm mb-3 font-medium">Please Register your account</p>

          <form  >
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
               
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="text"
                name="name"
                placeholder="Name"
                id="name"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">E-mail</label>
              <input
                 
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="email"
                name="email"
                placeholder="E-mail"
                id="email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                 
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">I agree to privacy policy & terms</label>
            </div>

            <button  className="bg-[#836bca] w-full text-white rounded-md px-7 py-2 mb-3 cursor-pointer">
                Submit
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have an account? <Link className="font-bold" to="/login">Sign In</Link>
              </p>
            </div>

            <div className="w-full flex justify-center items-center my-3">
              <div className="w-[45%] bg-[#836bca]  h-[1px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-[#836bca]  h-[1px]"></div>
            </div>

            <div className="flex justify-center items-center gap-3">
              <div className="w-full h-[35px] text-white flex rounded-md bg-red-500  shadow-lg justify-center cursor-pointer items-center">
                <span><FaGoogle /></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default Register