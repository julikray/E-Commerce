import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PropagateLoader } from 'react-spinners'
import { seller_register , messageClear  } from '../../store/Reducers/authReducer';
import toast from 'react-hot-toast';
 
function Register() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { loader , errorMessage ,successMessage } = useSelector(state=>state.auth)

  const [state, setState] = useState({
    name: "",
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
    dispatch(seller_register(state))
  };

  const overrideStyle ={
    display : 'flex',
    margin: '0 auto',
    height : '24px',
    justifyContent : 'center',
    alignItem : 'center',
    
  }

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
    <div className="min-w-screen min-h-screen bg-[#eeefee] flex justify-center items-center  ">
      <div className="w-[350px] text-[#6f6f70]  p-2">
        <div className="bg-[#fefeff] border border-[#d2d3d2] p-4 rounded-md shadow-sm ">
          <h2 className="text-xl mb-3 font-bold">Welcome to E-commerce</h2>
          <p className="text-sm mb-3 font-medium">Please Register your account</p>

          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input
                onChange={inputHandle}
                value={state.name}
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

            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 bg-gray-200 rounded border-gray-300 focus:ring-blue-500"
                type="checkbox"
                name="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox">I agree to privacy policy & terms</label>
            </div>

            <button disabled={loader ? true : false } className="bg-[#836bca] w-full text-white rounded-md px-7 py-2 mb-3 cursor-pointer">
               {
                 loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : "Sign Up"
               }
            </button>

            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have an account? <Link className="font-bold" to="/login">Sign In</Link>
              </p>
            </div>

           

           
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
