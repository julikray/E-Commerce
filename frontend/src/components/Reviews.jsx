import React, { useEffect, useState } from "react";
import Ratings from "./products/Ratings";
import RatingTemp from "./RatingTemp";
import Pagination from "./Pagination";
import RatingReact from "react-rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  customerReview,
  clearMessages,
  getCustomerReview,
} from "../store/reducers/homeReducer";
import { toast } from "react-toastify";

function Reviews({ product }) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, reviews, totalReview, ratingReview } = useSelector(
    (state) => state.home
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [rat, setRat] = useState("");
  const [rev, setRev] = useState("");

  const reviewSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: userInfo.name,
      review: rev,
      rating: rat,
      productId: product._id,
    };

    dispatch(customerReview(obj));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(
        getCustomerReview({
          productId: product._id,
          pageNumber,
        })
      );
      setRat("");
      setRev("");
      dispatch(clearMessages());
    }
  }, [successMessage]);

  useEffect(() => {
    if (product._id) {
      dispatch(
        getCustomerReview({
          productId: product._id,
          pageNumber,
        })
      );
    }
  }, [pageNumber, product]);

  return (
    <div className="mt-8">
      <div className="flex gap-10 md:flex-col">
        <div className="flex flex-col gap-2 justify-start items-start py-4 ">
          <div>
            <span className="text-6xl font-semibold ">{product.rating}</span>
            <span className="text-3xl font- text-slate-600 ">/5</span>
          </div>
          <div className="flex text-4xl">
            <Ratings ratings={product.rating} />
          </div>
          <p className="text-sm text-slate-600">{totalReview} Reviews</p>
        </div>

        <div className="flex gap-2 flex-col py-4">
          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px] ">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative ">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[0]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E] "
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[0]?.sum}{" "}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px] ">
              <RatingTemp rating={4} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative ">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[1]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]  "
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[1]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px] ">
              <RatingTemp rating={3} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative ">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[2]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E] "
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[2]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px] ">
              <RatingTemp rating={2} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative ">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[3]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E] "
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[3]?.sum}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px] ">
              <RatingTemp rating={1} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative ">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[4]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]"
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[4]?.sum}{" "}
            </p>
          </div>

          <div className="flex justify-start items-center gap-5">
            <div className="text-md flex gap-1 w-[93px] ">
              <RatingTemp rating={0} />
            </div>
            <div className="w-[200px] h-[14px] bg-slate-200 relative ">
              <div
                style={{
                  width: `${Math.floor(
                    (100 * (ratingReview[5]?.sum || 0)) / totalReview
                  )}%`,
                }}
                className="h-full bg-[#EDBB0E]  "
              ></div>
            </div>
            <p className="text-sm text-slate-600 w-[0%]">
              {" "}
              {ratingReview[5]?.sum}
            </p>
          </div>
        </div>
      </div>
      <h2 className="text-slate-600 text-xl font-bold py-5 ">
        Products Reviews {totalReview}
      </h2>
      <div className="flex flex-col gap-8 pb-10 pt-4 ">
        {reviews.map((r, i) => (
          <div key={i} className="flex flex-col gap-1 ">
            <div className="flex justify-between items-center ">
              <div className="flex gap-1 text-xl ">
                <RatingTemp rating={r.rating} />
              </div>
              <span>{r.date}</span>
            </div>
            <span className="text-slate-600 text-md ">{r.name}</span>
            <p className="text-slate-600 text-sm ">{r.review}</p>
          </div>
        ))}

        <div className="flex justify-end ">
          {totalReview > 5 && (
            <Pagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalItem={totalReview}
              parPage={perPage}
              showItem={Math.round(totalReview / 5)}
            />
          )}
        </div>
      </div>

      <div>
        {userInfo ? (
          <div className="flex flex-col gap-3 ">
            <div className="flex gap-1">
              <RatingReact
                onChange={(e) => setRat(e)}
                initialRating={rat}
                emptySymbol={
                  <span className="text-slate-600 text-4xl ">
                    <CiStar />
                  </span>
                }
                fullSymbol={
                  <span className="text-[#EDBB0E] text-4xl ">
                    <FaStar />
                  </span>
                }
              />
            </div>
            <form onSubmit={reviewSubmit}>
              <textarea
                value={rev}
                required
                onChange={(e) => setRev(e.target.value)}
                className="border outline-0 p-3 w-full "
                name=""
                id=""
                cols="30"
                rows="5"
              ></textarea>
              <div className="mt-2">
                <button className="py-1 px-5 bg-indigo-500 text-white rounded-sm ">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Link
              className="py-1 px-5 bg-indigo-500 text-white rounded-sm "
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;
