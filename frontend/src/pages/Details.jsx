import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaChevronRight,
  FaFacebookF,
  FaHeart,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Ratings from "../components/products/Ratings";
import Reviews from "../components/Reviews";
import ShopProducts from "../components/products/ShopProducts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../store/reducers/homeReducer";

import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";
import {
  addToCard,
  addToWishlist,
  messageClear,
} from "../store/reducers/cardReducer";

function Details() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, relatedProducts, moreProducts } = useSelector(
    (state) => state.home
  );

  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const [image, setImage] = useState("");
  const [state, setState] = useState("reviews");
  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    if (quantity >= product.stock) {
      toast.error("Out of stock");
    } else {
      setQuantity(quantity + 1);
    }
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addCard = () => {
    if (userInfo) {
      dispatch(
        addToCard({
          userId: userInfo.id,
          quantity,
          productId: product._id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
     dispatch( messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
     dispatch( messageClear());
    }
  }, [errorMessage, successMessage]);

  const addWishlist = () => {
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

  useEffect(() => {
    dispatch(getProductDetails(slug));
  }, [slug]);


  const buy = () => {
    let price =0 ;
    if(product.discount !== 0){
      price = product.price - Math.floor((product.price * product.discount) / 100)
    } else {
      price = product.price
    }

    const obj = [
      {
        sellerId : product.sellerId,
        shopName : product.shopName,
        price : quantity * (price - Math.floor((price*5)/100)),
        products : [
          {
            quantity,
            productInfo: product
          }
        ]
      }
    ]
    navigate('/shipping', {
      state: {
        products : obj,
        price: price * quantity,
        shipping_fee : 85,
        items: 1
      }
    })
  }

  return (
    <div>
      <Headers />
      {/* <div className="bg-[url(../../assets/image/banner/1.jpg )] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left ">
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
      </div> */}

      <div className="bg-slate-100 py-5 mb-5 mt-5">
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto ">
          <div className="flex justify-start items-center text-md text-slate-600 w-full ">
            <Link to="/">Home</Link>
            <span className="pt-1">
              <FaChevronRight />
            </span>
            <Link to="/">{product.category} </Link>
            <span className="pt-1">
              <FaChevronRight />
            </span>
            <Link to="/">{product.name} </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16 ">
          <div className="grid grid-cols-2 md-lg:grid-cols-1 gap-8 ">
            <div>
              <div className="p-5 border rounded-md ">
                <img
                  className="h-[500px] w-full rounded-md  "
                  src={image ? image : product.images?.[0]}
                  alt=""
                />
              </div>
              <div className="py-3 ">
                {product.images && (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    transitionDuration={500}
                  >
                    {product.images.map((img, i) => (
                      <div key={i} className="px-1 ">
                        <img
                          src={img}
                          alt={`Product ${i + 1}`}
                          className="h-[100px] w-[100px] object-cover cursor-pointer rounded-md "
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
                <h2>{product.name} </h2>
              </div>
              <div className="flex justify-start items-center gap-4 ">
                <div className="flex text-xl">
                  <Ratings ratings={product.rating} />
                </div>
                <span className="text-green-500 ">23 reviews </span>
              </div>
              <div className="text-2xl text-red-400 font-bold flex gap-3 ">
                {product.discount !== 0  ? (
                  <>
                    <h2 className="line-through ">Rs {product.price} </h2>
                    <h2>
                      Rs {product.price -
                        Math.floor((product.price * product.discount) / 100)} (-{product.discount}%)
                    </h2>
                  </>
                ) : (
                  <h2>Price : Rs {product.price} </h2>
                )}
              </div>
              <div className="text-slate-600  ">
                <p>{product.description}</p>
              </div>
              <div className="flex gap-3 pb-10 border-b  ">
                {product.stock ? (
                  <>
                    <div className="flex bg-slate-200 h-[50px] justify-center items-center text-xl rounded-md ">
                      <div onClick={dec} className="px-6 cursor-pointer">
                        -
                      </div>
                      <div className="px-5">{quantity} </div>
                      <div onClick={inc} className="px-6 cursor-pointer">
                        +
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={addCard}
                        className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg hover:shadow-grey-500/40 border border-[#cfcfcf] shadow-sm   text-[#6f6f70] rounded-md"
                      >
                        Add To Card
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div>
                  <div onClick={addWishlist} className="h-[50px] w-[50px] flex justify-center items-center cursor-pointer bg-red-500 text-red-100 rounded-md ">
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
                  <span
                    className={`text-${product.stock ? "green" : "red"}-500`}
                  >
                    {product.stock
                      ? `In Stock(${product.stock})`
                      : "Out of Stock"}
                  </span>

                  <ul className="flex justify-start items-center gap-3 ">
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center rounded-full  border border-[#cfcfcf] text-[#282856] "
                        href="#"
                      >
                        <FaFacebookF /> 
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center rounded-full border border-[#cfcfcf] text-[#282856] "
                        href="#"
                      >
                        <FaLinkedin /> 
                      </a>
                    </li>
                    <li>
                      <a
                        className="w-[38px] h-[38px] hover:bg-[#7fad39] hover:text-white flex justify-center items-center rounded-full border border-[#cfcfcf] text-[#282856] "
                        href="#"
                      >
                        <FaTwitter /> 
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                {product.stock ? (
                  <button onClick={buy} className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg  block hover:shadow-grey-500/40 border border-[#cfcfcf] shadow-sm  text-[#282856] rounded-md ">
                    Buy Now
                  </button>
                ) : (
                  ""
                )}
                <Link to={`/dashboard/chat/${product.sellerId}`} className="px-8 py-3 h-[50px] cursor-pointer hover:shadow-lg   block  hover:shadow-grey-500/40 border border-[#cfcfcf] shadow-sm  text-[#282856] rounded-md ">
                  Chat With Seller
                </Link>
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
                    <Reviews product={product} />
                  ) : (
                    <p className="py-5 text-slate-600 ">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[28%] md-lg:w-full ">
              <div className="pl-4 md-lg:pl-0 ">
                <div className="px-3 py-2 text-slate-600 bg-slate-200 rounded-md">
                  <h2>From {product.shopName} </h2>
                </div>
                <div className="flex flex-col gap-2 mt-3 border p-3 rounded-md ">
                  {moreProducts.map((p, i) => {
                    return (
                      <Link className="block">
                        <div key={i} className="relative h-[270px] ">
                          <img
                            src={p.images[0]}
                            alt="images"
                            className="h-full w-full object-cover rounded-md "
                          />
                          {p.discount !== 0 && (
                            <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                              {p.discount}%
                            </div>
                          )}
                        </div>

                        <h2 className="text-slate-600 py-1 ">{p.name}</h2>
                        <div className="flex items-center gap-2">
                           <h2 className="text-[#6699ff] text-lg font-bold ">
                            Rs {p.price} 
                          </h2>

                          <Ratings ratings={p.rating} />
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
        <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-1 ">
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
              {relatedProducts.map((p, i) => {
                return (
                  <SwiperSlide key={i}>
                    <Link className="block">
                      <div key={i} className="relative h-[270px] ">
                        <div className="w-full h-full  ">
                          <img
                            src={p.images[0]}
                            alt="images"
                            className="h-full w-full  rounded-md  "
                          />
                          <div className="absolute h-full w-full top-0 left-0 bg-[#000] opacity-25 hover:opacity-50 transition-all duration-500 "></div>
                        </div>
                        {p.discount !== 0 && (
                          <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                            {p.discount}%
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col gap-1">
                        <h2 className="text-slate-600 text-lg font-semibold ">
                          {p.name}
                        </h2>

                        <div className="flex justify-start items-center gap-3 ">
                          <h2 className="text-[#6699ff] text-lg font-bold ">
                            Rs {p.price} 
                          </h2>

                          <div className="flex items-center gap-2">
                            <Ratings ratings={p.rating} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="w-full flex justify-center items-center py-10 ">
            <div className="custom_bullet justify-center gap-3 !w-auto "></div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default Details;
