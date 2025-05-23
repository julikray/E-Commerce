import React from 'react'
import Headers from '../components/Headers'
import Footer from '../components/Footer'
import {  useLocation ,Link } from "react-router-dom";
import { FaChevronRight } from 'react-icons/fa';

function Shipping() {
    const  {state} = useLocation()
    console.log(state)
  return (
    <div>
        <Headers/>
         <section className="bg-[url(../../assets/image/banner/1.jpg )] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left ">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a] ">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto ">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white ">
              <h2 className="text-3xl font-bold ">E-commerce.on</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full ">
                <Link to="/">Home</Link>
                <span className="pt-1">
                  <FaChevronRight />
                </span>
                <span>Place Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* <Footer/> */}
    </div>
  )
}

export default Shipping