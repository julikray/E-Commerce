import React, { useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import {  useDispatch, useSelector } from 'react-redux';
import { customerLogin , messageClear } from "../store/reducers/authReducer";
import { toast } from 'react-toastify';

function Login() {

  
    const { loader , successMessage ,userInfo , errorMessage } = useSelector(state => state.auth)

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
  
     const [state, setState] = useState({
        email: "",
        password: "",
      });
    
      const inputHandle = (e) => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        });
      };
    
      const submit = (e) => {
        e.preventDefault(); 
        // console.log(state);
        dispatch(customerLogin(state))
      };
  
        useEffect(()=>{
      if(successMessage){
        toast.success(successMessage)
        dispatch(messageClear())
        navigate('/')
         
      }
        if(errorMessage){
          toast.error(errorMessage)
          dispatch(messageClear())
        }
      },[errorMessage , successMessage])


  return (
    <div>
     
      <div className="min-w-screen min-h-screen bg-[#eeefee] flex justify-center items-center">
        <div className="w-[350px] text-[#6f6f70] p-2">
          <div className="bg-[#fefeff] border border-[#d2d3d2]  p-4 rounded-md shadow-sm ">
            <h2 className="text-xl mb-3 font-bold">Welcome to E-commerce</h2>
            <p className="text-sm mb-3 font-medium">
              Please Sign In your account
            </p>

            <form onSubmit={submit} >
              <div className="flex flex-col w-full gap-1 mb-3">
                <label htmlFor="email">E-mail</label>
                <input
                onChange={inputHandle}
                value={state.email}
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
                 onChange={inputHandle}
                value={state.password}
                  className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md"
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  required
                />
              </div>

              <button className="bg-[#836bca] w-full text-white rounded-md px-7 py-2 mb-3 cursor-pointer">
                Submit
              </button>

              <div className="flex items-center mb-3 gap-3 justify-center">
                <p>
                  Don't Have an account?{" "}
                  <Link className="font-bold" to="/register">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  
    </div>
  );
}

export default Login;
