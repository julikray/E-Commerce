import React from "react";
import Headers from "../components/Headers";
import { FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import img1 from "../assets/image/products/1.webp";
import img2 from "../assets/image/products/2.webp";
import img3 from "../assets/image/products/3.webp";
import { Navigate, useNavigate ,Link} from "react-router-dom";
 

function Card() {
  const navigate = useNavigate()
  const productImages = [img1, img2, img3];

  const card_products = [1, 2, 3];
  const outofStockProduct = [1, 2];

  const redirect =() =>{
     navigate('/shipping' , {
      state: {
        products: [],
        price:500,
        shipping_fee: 454,
        items:4
      }
     })
    
  }

  return (
    <div>
      <Headers />

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
                <span>Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#eeeeee] ">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 ">
          {card_products.length > 0 || outofStockProduct.length > 0 ? (
            <div className="flex flex-wrap ">
              <div className="w-[67%] md-lg:w-full ">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4">
                      <h2 className="text-md text-green-500">
                        Stock Products{" "}
                        {card_products.length - outofStockProduct.length}
                      </h2>
                    </div>
                    {card_products.map((p, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2 ">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 ">
                            Juli Kumari
                          </h2>
                        </div>
                        {[1, 2, 3].map((p, i) => (
                          <div className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12 ">
                              <div className="flex sm:w-full gap-2 justify-start items-center ">
                                <img
                                  className="w-[80px] h-[80px] object-contain"
                                  src={productImages[i]}
                                  alt={`Product ${p}`}
                                />
                                <div className="pr-4 text-slate-600 ">
                                  <h2 className="text-md">
                                    TVasj eoiret dskjhfdjg jksd
                                  </h2>
                                  <span className="text-sm">Brand : Easy</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3 ">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500 ">
                                  600
                                </h2>
                                <p className="line-through">678</p>
                                <p>-10%</p>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl ">
                                  <div className="px-3 cursor-pointer">-</div>
                                  <div className="px-3">7</div>
                                  <div className="px-3 cursor-pointer">+</div>
                                </div>

                                <button className="px-5 py-[3px] bg-red-500 text-white ">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outofStockProduct.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className=" bg-white p-4">
                          <h2 className="text-md font-semibold text-red-500">
                            Out of Stock {outofStockProduct.length}
                          </h2>
                        </div>

                        <div className="flex bg-white p-4 flex-col gap-2 ">
                          {[1, 2, 3].map((p, i) => (
                            <div className="w-full flex flex-wrap ">
                              <div className="flex sm:w-full gap-2 w-7/12 ">
                                <div className="flex sm:w-full gap-2 justify-start items-center ">
                                  <img
                                    className="w-[80px] h-[80px] object-contain"
                                    src={productImages[i]}
                                    alt={`Product ${p}`}
                                  />
                                  <div className="pr-4 text-slate-600 ">
                                    <h2 className="text-md">
                                      TVasj eoiret dskjhfdjg jksd
                                    </h2>
                                    <span className="text-sm">
                                      Brand : Easy
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3 ">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500 ">
                                    600
                                  </h2>
                                  <p className="line-through">678</p>
                                  <p>-10%</p>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl ">
                                    <div className="px-3 cursor-pointer">-</div>
                                    <div className="px-3">7</div>
                                    <div className="px-3 cursor-pointer">+</div>
                                  </div>

                                  <button className="px-5 py-[3px] bg-red-500 text-white ">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[33%] md-lg:w-full " >
                <div className="pl-3 md-lg:pl-0 md-lg:mt-5" >
                  {
                    card_products.length > 0 && <div className="bg-white p-4 text-sla flex flex-col gap-3 " >
                      <h2 className="text-xl font-bold " >Order Summary</h2>
                      <div className="flex justify-between items-center" >
                        <span>4 Item</span>
                        <span>5677</span>
                      </div>
                       <div className="flex justify-between items-center" >
                        <span>Shipping Fee</span>
                        <span>56</span>
                      </div>
                        <div className="flex justify-between items-center" >
                        <span>Total</span>
                        <span className="text-lg text-orange-500 " >5644</span>
                      </div>

                      <button onClick={redirect} className="px-5 py-[6px] rounded-sm bg-red-500 text-red-50  " >Proceed to checkout</button>

                    </div>
                  }
 
                </div>
 
              </div>

            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-[#836bca] text-white " to="/shop">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* <Footer/> */}
    </div>
  );
}

export default Card;
