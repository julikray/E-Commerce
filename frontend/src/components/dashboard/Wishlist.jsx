import React, { useEffect } from "react";
import Ratings from "../products/Ratings";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistProducts,
  removeWishlistProducts,
  messageClear,
} from "../../store/reducers/cardReducer";
import { toast } from "react-toastify";

function Wishlist() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { wishlist, successMessage } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(getWishlistProducts(userInfo.id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage]);

  return (
    <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-6 ">
      {wishlist.map((p, i) => (
        <div
          key={i}
          className=" rounded-md group  transition-all duration-500 hover:shadow-md hover:-mt-3 bg-white "
        >
          <div className="relative overflow-hidden">
            {p.discount !== 0 && (
              <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                {p.discount} %
              </div>
            )}

            <img
              className="sm:h-full w-full h-[240px] object-contain  "
              src={p.images}
              alt="Product image"
            />


            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3 ">
              <li
                onClick={() => dispatch(removeWishlistProducts(p._id)) }
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaHeart />
              </li>
              <Link
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all "
                to={`/product/details/${p.slug}`}
              >
                <FaEye />
              </Link>

              <li className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                <FaShoppingCart />
              </li>
            </ul>
          </div>
          <div className="py-3 text-slate-600 px-2 ">
            <h2>{p.name}</h2>
            <div className="flex justify-start items-center gap-3  ">
              <span className="text-lg font-bold ">Rs {p.price}</span>
              <div className="flex">
                <Ratings ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;
