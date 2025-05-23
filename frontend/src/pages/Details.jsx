import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import {
  FaChevronRight,
  FaFacebookF,
  FaHeart,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import img1 from "../assets/image/products/1.webp";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import img2 from "../assets/image/products/2.webp";
import img3 from "../assets/image/products/3.webp";
import img4 from "../assets/image/products/4.webp";
import img5 from "../assets/image/products/5.webp";
import img6 from "../assets/image/products/6.webp";
import img7 from "../assets/image/products/7.webp";
import img8 from "../assets/image/products/8.webp";
import Ratings from "../components/products/Ratings";
import Reviews from "../components/Reviews";
import ShopProducts from "../components/products/ShopProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";

function Details() {
  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];
  const imagess = [img1, img2, img3];
  const discount = 15;
  const stock = 4;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <Headers />
      <div className="bg-[url(../../assets/image/banner/1.jpg )] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left ">
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a] ">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto ">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white ">
              <h2 className="text-3xl font-bold ">E-commerce.on</h2>
              <div className="flex justify-center items-center gap-2 text-2xl w-full ">
                <Link>Home</Link>
                <span className="pt-1">
                  <FaChevronRight />
                </span>
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 py-5 mb-5">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto ">
          <div className="flex justify-start items-center text-md text-slate-600 w-full ">
            <Link to="/">Home</Link>
            <span className="pt-1">
              <FaChevronRight />
            </span>
            <Link to="/">Sports</Link>
            <span className="pt-1">
              <FaChevronRight />
            </span>
            <Link to="/">Tv asdjfd dflgk</Link>
          </div>
        </div>
      </div>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16 ">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8 ">
            <div>
              <div className="p-5 border">
                <img className="h-[500px] w-full " src={image || img1} alt="" />
              </div>
              <div className="py-3">
                {images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {images.map((img, i) => (
                      <div key={i} className="px-1">
                        <img
                          src={img}
                          alt={`Product ${i + 1}`}
                          className="h-[100px] w-[100px] object-cover cursor-pointer"
                          onClick={() => setImage(img)}
                        />
                      </div>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="text-3xl text-slate-600 font-bold ">
                <h2>Tv elsdg lkjdfhs sdakf</h2>
              </div>
              <div className="flex justify-start items-center gap-4 ">
                <div className="flex text-xl">
                  <Ratings ratings={4.5} />
                </div>
                <span className="text-green-500 ">23 reviews </span>
              </div>
              <div className="text-2xl text-red-500 font-bold flex gap-3 ">
                {discount ? (
                  <>
                    <h2 className="line-through ">Rs 500 </h2>
                    <h2>
                      Rs {500 - Math.floor((500 * discount) / 100)}
                      (-{discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Price : Rs 5000 </h2>
                )}
              </div>
              <div className="text-slate-600 ">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Accusantium, deserunt? Recusandae dolore fugiat eum facilis
                  molestiae repellendus, perspiciatis, explicabo vel, at enim
                  autem nostrum quia nihil molestias provident dignissimos
                  eveniet.
                </p>
              </div>
              <div className="flex gap-3 pb-10 border-b ">
                {stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl ">
                      <div className="px-6 cursor-pointer">-</div>
                      <div className="px-5">5</div>
                      <div className="px-6 cursor-pointer">+</div>
                    </div>
                    <div>
                      <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-purple-500/40 bg-purple-500 text-white ">
                        Add To Card
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div>
                  <div className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer bg-red-500 text-red-100 ">
                    <FaHeart />
                  </div>
                </div>
              </div>

              <div className="flex py-5 gap-5 ">
                <div className="w-[150px] text-black font-bold text-xl flex flex-col gap-5 ">
                  <span>Availability</span>
                  <span>Share on</span>
                </div>
                <div className="flex flex-col gap-5 ">
                  <span className={`text-${stock ? "green" : "red"}-500`}>
                    {stock ? `In Stock(${stock})` : "Out of Stock"}
                  </span>

                  <ul className="flex justify-start items-center gap-3 ">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center rounded-full bg-purple-500 "
                        href="#"
                      >
                        <FaFacebookF />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center rounded-full bg-purple-500 "
                        href="#"
                      >
                        <FaLinkedin />{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center rounded-full bg-purple-500 "
                        href="#"
                      >
                        <FaTwitter />{" "}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                {stock ? (
                  <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-emerald-500 text-white ">
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <button className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-emerald-500/40 bg-lime-500 text-white ">
                  Chat Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16 ">
          <div className="flex flex-wrap">
            <div className="w-[72%] md-lg:w-full ">
              <div className="pr-4 md-lg:pr-0 ">
                <div className="grid grid-cols-2 ">
                  <button
                    onClick={() => setState("reviews")}
                    className={`py-1 px-5 hover:bg-green-500 ${
                      state === "reviews"
                        ? "bg-green-500 text-white "
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm `}
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => setState("description")}
                    className={`py-1 px-5 hover:bg-green-500 ${
                      state === "description"
                        ? "bg-green-500 text-white "
                        : "bg-slate-200 text-slate-700"
                    } rounded-sm `}
                  >
                    Description
                  </button>
                </div>
                <div>
                  {state === "reviews" ? (
                    <Reviews />
                  ) : (
                    <p className="py-5 text-slate-600 ">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Accusantium, deserunt? Recusandae dolore fugiat eum
                      facilis molestiae repellendus, perspiciatis, explicabo
                      vel, at enim autem nostrum quia nihil molestias provident
                      dignissimos eveniet.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[28%] md-lg:w-full ">
              <div className="pl-4 md-lg:pl-0 ">
                <div className="px-3 py-2 text-slate-600 bg-slate-200 ">
                  <h2>From ZARA Fashion</h2>
                </div>
                <div className="flex flex-col gap-2 mt-3 border p-3 ">
                  {imagess.map((img, i) => {
                    return (
                      <Link className="block">
                        <div key={i} className="relative h-[270px] ">
                          <img
                            src={img}
                            alt={`Product ${i + 1}`}
                            className="h-full w-full object-cover  "
                          />
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                            6%
                          </div>
                        </div>

                        <h2 className="text-slate-600 py-1 ">
                          dfg fdlk dsfgjfdp dfgj
                        </h2>
                        <div className="flex items-center gap-2">
                          <Ratings ratings={4.5} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16 ">
          <h2 className="text-2xl py-8 text-slate-600 ">Related Products</h2>
          <div>
            <Swiper
              slidesPerView="auto"
              breakpoints={{
                1280: {
                  slidesPerView: 3,
                },
                565: {
                  slidesPerView: 2,
                },
              }}
              spaceBetween={25}
              loop={true}
              pagination={{
                clickable: true,
                el: ".custom_bullet",
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {images.map((img, i) => {
                return (
                  <SwiperSlide>
                    <Link className="block">
                      <div key={i} className="relative h-[270px] ">
                        <div className="w-full h-full ">
                          <img
                            src={img}
                            alt={`Product ${i + 1}`}
                            className="h-full w-full object-cover  "
                          />
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500 "></div>
                        </div>
                        <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                          6%
                        </div>
                      </div>
                      <div className="p-4 flex flex-col gap-1" >
                      <h2 className="text-slate-600 text-lg font-semibold ">
                        dfg fdlk dsfgjfdp dfgj
                      </h2>

                      <div className="flex justify-start items-center gap-3 " >
                        <h2 className="text-[#6699ff] text-lg font-bold " >5677</h2>
                        
                      <div className="flex items-center gap-2">
                        <Ratings ratings={4.5} />
                      </div>

                      </div>

                      </div>

                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>

          </div>

            <div className="w-full flex justify-center items-center py-10 " >
              <div className="custom_bullet justify-center gap-3 !w-auto " ></div>
            </div>
        </div>
      </section>

      {/* <Footer/> */}
    </div>
  );
}

export default Details;
