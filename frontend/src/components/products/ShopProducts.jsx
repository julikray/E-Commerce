import React from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

import img1 from "../../assets/image/products/1.webp";
import img2 from "../../assets/image/products/2.webp";
import img3 from "../../assets/image/products/3.webp";
import img4 from "../../assets/image/products/4.webp";
import img5 from "../../assets/image/products/5.webp";
import img6 from "../../assets/image/products/6.webp";
import img7 from "../../assets/image/products/7.webp";
import img8 from "../../assets/image/products/8.webp";

function ShopProducts({ styles }) {
  const productImages = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 "
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2 "
      } gap-3 `}
    >
      {[1, 2, 3, 4, 5, 6].map((p, i) => (
        <div
          className={`flex transition-all duration-1000 hover:shadow-md hover:translate-y-3 ${
            styles === "grid"
              ? "flex-col justify-start items-start"
              : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
          } w-full gap-4 bg-white p-1 rounded-md `}
        >
          <div
            className={
              styles === "grid"
                ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden "
                : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden "
            }
          >
            {/* <img className='w-full h-full object-contain' src={img1} alt="image"   /> */}
            <img
              className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-cover "
              src={productImages[i]}
              alt={`Product ${p}`}
            />

            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3 ">
              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                <FaHeart />
              </li>
              <Link
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all "
                to="#"
              >
                <FaEye />
              </Link>

              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                <FaShoppingCart />
              </li>
            </ul>
          </div>

          <div className="flex justify-start items-start flex-col gap-1 ">
            <h2 className="text-md text-slate-700 font-medium ">
              Idkjsfh IIdskjf IIdsj
            </h2>
            <div className="flex justify-start items-center gap-2 ">
              <span className="text-md font-bold text-slate-700 ">657</span>

              <div className="flex text-lg">
                <Ratings ratings={4.5} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShopProducts;
