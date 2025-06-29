import React, { useEffect } from "react";
import Headers from "../components/Headers";
import { FaChevronRight } from "react-icons/fa";
import Footer from "../components/Footer";
import img1 from "../assets/image/products/1.webp";
import img2 from "../assets/image/products/2.webp";
import img3 from "../assets/image/products/3.webp";
import { useNavigate ,Link} from "react-router-dom";
import { useDispatch ,useSelector } from "react-redux";
import { deleteCardProduct, getCardProducts, messageClear, quantityDec, quantityInc } from "../store/reducers/cardReducer";
import { toast } from 'react-toastify';
 

function Card() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
 
   const { userInfo } = useSelector(state => state.auth)
    const { cardProducts ,  successMessage ,shippingFee ,outOfStockProducts ,buyProductItem ,price } = useSelector(state => state.card)

  const redirect =() =>{
     navigate('/shipping' , {
      state: {
        products: cardProducts,
        price:price,
        shipping_fee: shippingFee,
        items:buyProductItem
      }
     })
    
  }

  useEffect(() => {
    dispatch(getCardProducts(userInfo.id))

  },[])

   useEffect(() => {
    if(successMessage){
      toast.success(successMessage)
      dispatch(messageClear())
      dispatch(getCardProducts(userInfo.id))
    }
     

  },[successMessage])

  // const inc = (quantity , stock , cardId) => {
  //   const temp = quantity + 1 ;
  //   if( temp <= stock){
  //     dispatch(quantityInc(cardId))
  //   }
  // }

  const inc = (quantity, stock, cardId) => {
  const temp = quantity + 1;
  console.log("Current Quantity:", quantity, "Stock:", stock);
  if (temp <= stock) {
    console.log("Incrementing quantity for cardId:", cardId);
    dispatch(quantityInc(cardId));
  } else {
    console.warn("Cannot increment, exceeds stock");
  }
};

   const dec = (quantity ,  cardId) => {
    const temp = quantity - 1 ;
    if( temp !== 0){
      dispatch(quantityDec(cardId))
    }
  }

  return (
    <div>
      <Headers />
{/* 
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
      </section> */}
      
      <section className="bg-slate-200 mt-5">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 ">
          {(cardProducts?.length > 0 || outOfStockProducts?.length > 0)  ? (
            <div className="flex flex-wrap ">
              <div className="w-[67%] md-lg:w-full ">
                <div className="pr-3 md-lg:pr-0">
                  <div className="flex flex-col gap-3">
                    <div className="bg-white p-4 rounded-md ">
                      <h2 className="text-md text-green-500">
                        Stock Products {cardProducts.length  }
                      </h2>
                    </div>
                    {cardProducts.map((p, i) => (
                      <div className="flex bg-white p-4 flex-col gap-2 rounded-md  ">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 ">
                            {p.shopName}
                          </h2>
                        </div>
                        {p.products.map((pt, i) => (
                          <div className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12 ">
                              <div className="flex sm:w-full gap-2 justify-start items-center ">
                                <img
                                  className="w-[80px] h-[80px] object-contain"
                                  src={pt.productInfo.images[0]}
                                  alt="images"
                                />
                                <div className="pr-4 text-slate-600 ">
                                  <h2 className="text-md">
                                   {pt.productInfo.name}
                                  </h2>
                                  <span className="text-sm">Brand :{pt.productInfo.brand} </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between w-5/12 sm:w-full sm:mt-3  ">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500 ">
                                  Rs {pt.productInfo.price - Math.floor((pt.productInfo.price*pt.productInfo.discount)/100)}
                                </h2>
                                <p className="line-through">Rs {pt.productInfo.price} </p>
                                <p>-{pt.productInfo.discount}% </p>
                              </div>
                              <div className="flex gap-2 flex-col">
                                <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl rounded-md  ">
                                  <div onClick={() => dec(pt.quantity,  pt._id)} className="px-3 cursor-pointer">-</div>
                                  <div className="px-3">{pt.quantity} </div>
                                  <div onClick={() => inc(pt.quantity , pt.productInfo.stock , pt._id)} className="px-3 cursor-pointer">+</div>
                                </div>

                                <button onClick={()=> dispatch(deleteCardProduct(pt._id)) } className="px-5 py-[3px] bg-red-500 text-white cursor-pointer rounded-md  ">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}

                    {outOfStockProducts.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <div className=" bg-white p-4">
                          <h2 className="text-md font-semibold text-red-500">
                            Out of Stock {outOfStockProducts.length}
                          </h2>
                        </div>

                        <div className="flex bg-white p-4 flex-col gap-2 ">
                          {outOfStockProducts.map((p, i) => (
                            <div key={i} className="w-full flex flex-wrap ">
                              <div className="flex sm:w-full gap-2 w-7/12 ">
                                <div className="flex sm:w-full gap-2 justify-start items-center ">
                                  <img
                                    className="w-[80px] h-[80px] object-contain"
                                    src={p.products[0].images[0]}
                                    alt='image'
                                  />
                                  <div className="pr-4 text-slate-600 ">
                                    <h2 className="text-md">
                                      {p.products[0].name}
                                    </h2>
                                    <span className="text-sm">
                                      Brand : {p.products[0].brand}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between w-5/12 sm:w-full sm:mt-3 ">
                                <div className="pl-4 sm:pl-0">
                                  <h2 className="text-lg text-orange-500 ">
                                    Rs {p.products[0].price - Math.floor((p.products[0].price*p.products[0].discount)/100)}
                                  </h2>
                                  <p className="line-through">
                                    Rs {p.products[0].price}
                                      
                                  </p>
                                  <p>-{p.products[0].discount}%</p>
                                </div>
                                <div className="flex gap-2 flex-col">
                                  <div className="flex bg-slate-200 h-[30px] justify-center items-center text-xl rounded-md  ">
                                    <div onClick={() => dec(p.quantity,  p._id)}  className="px-3 cursor-pointer">-</div>
                                    <div className="px-3">{p.quantity} </div>
                                    <div  onClick={() => inc(p.quantity,p.products[0].stock , p._id)}   className="px-3 cursor-pointer">+</div>
                                  </div>

                                  <button onClick={()=> dispatch(deleteCardProduct(p._id)) } className="px-5 py-[3px] bg-red-500 text-white cursor-pointer rounded-md ">
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
                    cardProducts.length > 0 && <div className="bg-white p-4 text-sla flex flex-col gap-3 rounded-md  " >
                      <h2 className="text-xl font-bold " >Order Summary</h2>
                      <div className="flex justify-between items-center" >
                        <span>{buyProductItem} Item</span>
                        <span>{price}</span>
                      </div>
                       <div className="flex justify-between items-center" >
                        <span>Shipping Fee</span>
                        <span>Rs {shippingFee} </span>
                      </div>
                        <div className="flex justify-between items-center" >
                        <span>Total</span>
                        <span className="text-lg text-orange-500 " >Rs {price + shippingFee} </span>
                      </div>

                      <button onClick={redirect} className="px-5 py-[6px] rounded-md bg-red-500 text-red-50  " >Proceed to checkout</button>

                    </div>
                  }
 
                </div>
 
              </div>

            </div>
          ) : (
            <div>
              <Link className="px-4 py-1 bg-[#836bca] text-white " to="/shops">
                Shop Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default Card;
