import React from 'react'
import { FaList } from "react-icons/fa";
import { useSelector } from 'react-redux';
import profileimg from "../assets/image/profileimg.jpg";

function Header({showSidebar , setShowSidebar }) {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40 ' >
      
      <div className='ml-0 lg:ml-[260px] rounded-md h-[65px] flex justify-between lg:justify-end items-center bg-[#fefeff] px-5 transition-all border border-[#e9e8e9] ' >
       
       <div onClick={()=> setShowSidebar(!showSidebar) } className='w-[35px] flex lg:hidden h-[35px] rounded-sm bg-[#836bca] shadow-lg   justify-center items-center cursor-pointer ' >
        <span> <FaList /> </span>

       </div>

       <div className='flex justify-center items-center gap-8 relative ' >
        <div className='flex justify-center items-center ' >
          <div className='flex justify-center items-center gap-3 ' >
            <div className='flex justify-center items-center flex-col text-end ' >
              <h2 className='text-md font-bold ' >{userInfo.name} </h2>
              <span className='text-[14px] w-full font-normal ' >{userInfo.role}</span>
            </div>
           <img className=' w-[45px] h-[45px] rounded-md bg-amber-300 ' src={userInfo.image || profileimg } alt="Logo" />

          </div>

        </div>

       </div>

      </div>
      
      </div>
  )
}

export default Header