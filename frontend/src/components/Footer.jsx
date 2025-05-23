import React from 'react'
import logo from "../assets/image/logo.png";

function Footer() {
  return (
    <div className='bg-[#f3f6fa] ' >
        <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6 ' >
        <div className='w-3/12 lg:w-4/12 sm:w-full ' >
        <div className='flex flex-col gap-3 ' >
            <img className='w-[190px] h-[70px] ' src={logo} alt="logo" />
            <ul className='flex flex-col gap-2 text-slate-600 ' >
                <li>Addresss : Hajipur , Vaishali </li>
                <li>Phone : +91 83457487450 </li>
                <li>Email : e-commerce@gmail.com </li>
            </ul>
            
        </div>

        </div>
        </div>
        
    </div>
  )
}

export default Footer