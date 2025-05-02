import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { admin_login , messageClear } from '../../store/Reducers/authReducer';
import { PropagateLoader } from 'react-spinners'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function AdminLogin() {
   
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader , errorMessage ,successMessage } = useSelector(state=>state.auth)

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
    dispatch(admin_login(state))
    console.log(state);
  };

  const overrideStyle ={
    display : 'flex',
    margin: '0 auto',
    height : '24px',
    justifyContent : 'center',
    alignItem : 'center',
    
  }

  useEffect(()=>{
    if(errorMessage){
      toast.error(errorMessage)
      dispatch(messageClear())
    }
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      navigate('/')
    }
  },[errorMessage , successMessage])

  return (
    <div className="min-w-screen min-h-screen bg-[#eeefee] flex justify-center items-center ">
      <div className="w-[350px] text-[#6f6f70] p-2">
        <div className="bg-[#fefeff] border border-[#d2d3d2] p-4 rounded-md shadow-sm ">
          <h2 className="text-xl mb-3 font-bold text-center ">Welcome to E-commerce</h2>
          <p className="text-sm mb-3 font-medium text-center">Please Admin Sign In your account</p>

          <form onSubmit={submit}>
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

            <button disabled={loader ? true : false } className="bg-[#836bca] w-full text-white rounded-md px-7 py-2 mb-3 cursor-pointer">
               {
                loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : "Login"
               }
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
