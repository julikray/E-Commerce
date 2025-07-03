import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import img1 from "../assets/image/products/1.webp";
import img2 from "../assets/image/products/2.webp";
import img3 from "../assets/image/products/3.webp";
import { useDispatch ,useSelector } from "react-redux";
import { placeOrder} from '../store/reducers/orderReducer'

function Shipping() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
   const { userInfo } = useSelector(state => state.auth)
  const productImages = [img1, img2, img3];
  const { state : { products ,price , shipping_fee , items } } = useLocation();
  const [res , setRes] = useState(false)
  
  const [states , setStates] = useState({
    name: '',
    address: '',
    phone: '',
    pinCode: '',
    city: ''
  })

  const inputHandle = (e) => {
    setStates({
      ...states,
      [e.target.name] : e.target.value
    })
  }

  const save = (e) => {
    e.preventDefault()
    const { name , address,phone , pinCode ,city } = states;
    if(name&& address&& phone && pinCode&& city){
      setRes(true)

    }
  }

  console.log( products)

 const handlePlaceOrder = () => {
  dispatch(placeOrder({
    price, 
    products, 
    shipping_fee, 
    shippingInfo: states, 
    userId: userInfo.id, 
    navigate, 
    items 
  }))
}

  return (
    <div>
      <Headers />
      {/* <section className="bg-[url(../../assets/image/banner/1.jpg )] h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left ">
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
      </section> */}

      <section className="bg-slate-200 mt-5 ">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-7 ">
          <div className="w-full flex flex-wrap ">
            <div className="w-[67%] md-lg:w-full ">
              <div className="flex flex-col gap-3 ">
                <div className="bg-white p-6 shadow-sm rounded-md ">
                 {
                  !res && <>
                   <h2 className="text-slate-600 font-bold pb-3 ">
                    Shipping Information
                  </h2>
                  <form onSubmit={save}  >
                    <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600 ">
                      <div className="flex flex-col gap-1 mb-2 w-full ">
                        <label htmlFor="name">Name</label>
                        <input
                        onChange={inputHandle} 
                        value={states.name}
                          type="text"
                          className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md  "
                          name="name"
                          placeholder="name"
                          id="name"
                        />
                      </div>
                      <div className="flex flex-col gap-1 mb-2 w-full ">
                        <label htmlFor="address">Address</label>
                        <input
                         onChange={inputHandle} 
                        value={states.address}
                          type="text"
                          className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md  "
                          name="address"
                          placeholder="House no / building / street / area"
                          id="address"
                        />
                      </div>
                    </div>


                      <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600 ">
                      <div className="flex flex-col gap-1 mb-2 w-full ">
                        <label htmlFor="phone">Phone</label>
                        <input
                         onChange={inputHandle} 
                        value={states.phone}
                          type="text"
                          className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md  "
                          name="phone"
                          placeholder="phone"
                          id="phone"
                        />
                      </div>
                      <div className="flex flex-col gap-1 mb-2 w-full ">
                        <label htmlFor="pin">Pin code</label>
                        <input
                         onChange={inputHandle} 
                        value={states.pinCode}
                          type="text"
                          className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md  "
                          name="pinCode"
                          placeholder="pin code"
                          id="pin"
                        />
                      </div>
                    </div>



                     <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600 ">
                      <div className="flex flex-col gap-1 mb-2 w-full ">
                        <label htmlFor="city">City</label>
                        <input
                         onChange={inputHandle} 
                        value={states.city}
                          type="text"
                          className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md  "
                          name="city"
                          placeholder="city"
                          id="city"
                        />
                      </div>
                      <div className="flex flex-col gap-1 mb-2 w-full ">
                       <button className="px-3 py-[6px] rounded-sm hover:shadow-indigo-500/20 hover:shadow-lg bg-indigo-500 text-white " >
                        Save
                       </button>
                      </div>
                    </div>
                  </form>
                  </>

            
                 }

                 {

                  res && 
                  <div className="flex flex-col gap-1 rounded-md  " >
                    <h2 className="text-slate-600 font-semibold pb-2 " >Deliver to {states.name} </h2>
                    <p>
                      <span className="bg-blue-200 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  " >Home</span>
                      <span className="text-slate-600 text-sm " >
                        {states.address} <br />
                        {states.pinCode} <br/>
                        {states.city} <br />

                      </span>
                      <span onClick={()=>setRes(false)} className="text-indigo-500 cursor-pointer " >Change</span>
                    </p>
                    <p className="text-slate-600 text-sm " >Email to julikroy@gmail.com </p>

                  </div> 

                 }




                </div>

                 {products.map((p, i) => (
                      <div key={i} className="flex bg-white p-4 flex-col gap-2 rounded-md ">
                        <div className="flex justify-start items-center">
                          <h2 className="text-md text-slate-600 ">
                             {p.shopName}
                          </h2>
                        </div>
                        {p.products.map((pt, i) => (
                          <div key={i } className="w-full flex flex-wrap">
                            <div className="flex sm:w-full gap-2 w-7/12 ">
                              <div className="flex sm:w-full gap-2 justify-start items-center ">
                                <img
                                  className="w-[80px] h-[80px] object-contain"
                                  src={pt.productInfo.images[0]}
                                  alt= 'product image'
                                />
                                <div className="pr-4 text-slate-600 ">
                                  <h2 className="text-md">
                                      {pt.productInfo.name}
                                  </h2>
                                  <span className="text-sm">Brand : {pt.productInfo.brand} </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end w-5/12 sm:w-full sm:mt-3 ">
                              <div className="pl-4 sm:pl-0">
                                <h2 className="text-lg text-orange-500 ">
                                  Rs {pt.productInfo.price - Math.floor((pt.productInfo.price*pt.productInfo.discount)/100)}
                                </h2>
                                <p className="line-through">Rs {pt.productInfo.price} </p>
                                <p>-{pt.productInfo.discount}% </p>
                              </div>
                              
                            </div>
                          </div>
                        ))}
                      </div>
                    ))} 



              </div>
            </div>

            <div className="w-[33%] md-lg:w-full  " >
              <div className="pl-3 md-lg:pl-0 " >
                <div className="bg-white font-medium p-5 text-slate-600 flex flex-col gap-3 rounded-md " >
                  <h2 className="text-xl font-semibold " >Order Summary</h2>
                  <div className="flex justify-between items-center" >
                    <span>Items Total</span>
                    <span>Rs {price} </span>
                  </div>
                   <div className="flex justify-between items-center" >
                    <span>Delivery Fee</span>
                    <span>Rs {shipping_fee} </span>
                  </div>
                   <div className="flex justify-between items-center" >
                    <span>Total Payment</span>
                    <span>Rs {price + shipping_fee} </span>
                  </div>

                   <div className="flex justify-between items-center" >
                    <span>Total</span>
                    <span>Rs {price + shipping_fee} </span>
                  </div>

                  <button onClick={handlePlaceOrder} disabled={res ? false : true }  className={`px-5 py-[6px] rounded-sm hover:shadow-red-500/20 hover:shadow-lg ${res ? 'bg-red-500' : 'bg-red-300' } text-sm text-white uppercase `} >Place Order</button>

                </div>

              </div>
              

            </div>




          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default Shipping;
