import React from "react";
import box from "../../assets/image/box.png";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

import img1 from "../../assets/image/products/1.webp";
import img2 from "../../assets/image/products/2.webp";
import img3 from "../../assets/image/products/3.webp";
import img4 from "../../assets/image/products/4.webp";
import img5 from "../../assets/image/products/5.webp";
import img6 from "../../assets/image/products/6.webp";
import img7 from "../../assets/image/products/7.webp";
import img8 from "../../assets/image/products/8.webp";
import Ratings from "./Ratings";

function FeatureProducts() {
  const productImages = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div className="w-[85%] flex flex-wrap mx-auto ">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px] ">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#836bca] mt-4 "></div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-6 ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((p, i) => (
          <div className="border group  transition-all duration-500 hover:shadow-md hover:-mt-3 ">
            <div className="relative overflow-hidden">
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                6%
              </div>
              <img className="sm:w-full w-full h-[240px] object-contain  " src={productImages[i]} alt={`Product ${p}`} />

              {/* <div className="w-full h-[400px] overflow-hidden">
                <img
                  className="w-full h-full object-fill "
                  src={productImages[i]}
                  alt={`Product ${p}`}
                />
              </div> */}

              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3 ">
                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaHeart />
                </li>
                <Link
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all "
                  to="/product/details/dsdfsf"
                >
                  <FaEye />
                </Link>

                <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaShoppingCart />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2 " >
              <h2>TV panel adkgdfsjgjkdf sfdkjg</h2>
              <div className="flex justify-start items-center gap-3  " >
                <span className="text-lg font-bold " >670</span>
                <div className="flex" >
                  <Ratings ratings={4.5} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureProducts;
