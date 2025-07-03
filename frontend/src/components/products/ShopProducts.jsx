import React from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCard,
  addToWishlist,
  messageClear,
} from "../../store/reducers/cardReducer";

function ShopProducts({ styles, products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const handleAddToCart = (id) => {
    if (userInfo) {
      dispatch(
        addToCard({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  const handleAddToWishlist = (product) => {
    if (userInfo) {
      dispatch(
        addToWishlist({
          userId: userInfo.id,
          productId: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          discount: product.discount,
          rating: product.rating,
          slug: product.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`w-full grid ${
        styles === "grid"
          ? "grid-cols-3 md-lg:grid-cols-2 md:grid-cols-2 "
          : "grid-cols-1 md-lg:grid-cols-2 md:grid-cols-2 "
      } gap-3 `}
    >
      {products.map((p, i) => (
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
            <img
              className="w-full h-full object-contain"
              src={p.images[0]}
              alt="image"
            />

            <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3 ">
              <li
                onClick={() => handleAddToWishlist(p)}
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

              <li
                onClick={() => handleAddToCart(p._id)}
                className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
              >
                <FaShoppingCart />
              </li>
            </ul>
          </div>

          <div className="flex justify-start items-start flex-col gap-1 ">
            <h2 className="text-md text-slate-700 font-medium ">{p.name}</h2>
            <div className="flex justify-start items-center gap-2 ">
              <span className="text-md font-bold text-slate-700 ">
                Rs {p.price}{" "}
              </span>

              <div className="flex text-lg">
                <Ratings ratings={p.rating} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShopProducts;
