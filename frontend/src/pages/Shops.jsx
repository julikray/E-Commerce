import React, { useEffect, useState } from "react";
import Headers from "../components/Headers";
import { FaChevronRight, FaThList } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import { Range } from "react-range";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Products from "../components/products/Products";
import { IoGrid } from "react-icons/io5";
import ShopProducts from "../components/products/ShopProducts";
import {  useDispatch, useSelector } from 'react-redux';
import { priceRangeProduct, queryProducts} from "../store/reducers/homeReducer";

function Shops() {

  
  const dispatch = useDispatch()
  const {  products , totalProduct ,  latestProducts ,categorys ,priceRange , parPage  } = useSelector(state=>state.home)
  const [pageNumber, setPageNumber] = useState(1);
 
  const [styles, setStyles] = useState("grid");
  const [filter, setFilter] = useState(true);
 const [category , setCategory] = useState('')
  const [state, setState] = useState({ values: [priceRange.low , priceRange.high ] });
  const [rating , setRating] = useState('')
  const [sortPrice , setSortPrice] = useState('')

  useEffect(()=>{
    dispatch(priceRangeProduct())

  },[])

  useEffect(() =>{
    setState({
      values: [priceRange.low , priceRange.high]
    })

  }, [priceRange])

  const queryCategory = (e , value) => {
    if(e.target.checked){
      setCategory(value)
    }else{
      setCategory('')
    }
  }

  // console.log(category)
  useEffect(() => {
    dispatch(
      queryProducts({
        low: state.values[0],
        high: state.values[1],
        category,
        rating,
        sortPrice,
        pageNumber
      })
    )

  },[state.values[0] , state.values[1] , category , rating  , pageNumber , sortPrice ])

  const resetRating = () => {
    setRating('')
    dispatch(queryProducts({
       low: state.values[0],
        high: state.values[1],
        category,
        rating: '' ,
        sortPrice,
        pageNumber
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
                <Link  to="/" >Home</Link>
                <span className="pt-1">
                  <FaChevronRight /> 
                </span>
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="py-16">
        <div className="w-[85%] md:w-[90%] sm:w-[90%] lg:w-[90%] h-full mx-auto ">
          <div className={`md:block hidden ${!filter ? "mb-6" : "md-0"} `}>
            <button
              onClick={() => setFilter(!filter)}
              className="text-center w-full py-2 px-3 bg-indigo-500 text-white "
            >
              Filter Product
            </button>
          </div>
          <div className="w-full flex flex-wrap ">
            <div
              className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 ${
                filter
                  ? "md:h-0 md:overflow-hidden md:mb-6 "
                  : "md:h-auto md:overflow-auto md:mb-0"
              } `}
            >
              <h2 className="text-3xl font-bold mb-3 text-slate-600 ">
                Category
              </h2>
              <div className="py-2">
                {categorys.map((c, i) => (
                  <div
                    className=" flex justify-start items-center gap-2 py-1"
                    key={i}
                  >
                    <input checked={category === c.name ? true : false } onChange={(e) => queryCategory(e,c.name)} type="checkbox" id={c.name} />
                    <label
                      className="text-slate-600 block cursor-pointer"
                      htmlFor={c.name}
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>

              <div className="py-2 flex flex-col gap-5 ">
                <h2 className="text-3xl font-bold mb-3 text-slate-600">
                  Price
                </h2>
                <Range
                  step={5}
                  min={priceRange.low}
                  max={priceRange.high}
                  values={state.values}
                  onChange={(values) => setState({ values })}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      className="w-full h-[6px] bg-slate-200 rounded-full cursor-default "
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      className="w-[15px] h-[15px] bg-blue-500 rounded-full  "
                      {...props}
                    />
                  )}
                />

                <div>
                  <span className="text-red-500 font-bold text-lg ">
                    ₹ {Math.floor(state.values[0])} - ₹{" "}
                    {Math.floor(state.values[1])}{" "}
                  </span>
                </div>
              </div>

              <div className="py-3 flex flex-col gap-4">
                <h2 className="text-3xl font-bold mb-3 text-slate-600 ">
                  Rating
                </h2>
                <div className="flex flex-col gap-3 ">
                  <div onClick={() => setRating(5)} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                  </div>

                  <div onClick={() => setRating(4)}  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                  </div>
                  <div onClick={() => setRating(3)}  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                  </div>
                  <div onClick={() => setRating(2)}  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                  </div>

                  <div onClick={() => setRating(1)}  className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                  </div>

                  <div  onClick={resetRating} className="text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer ">
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                  </div>
                </div>
              </div>

              <div className="py-5 flex flex-col gap-4 md:hidden ">
                <Products title="Latest Products " products={latestProducts} />
              </div>
            </div>
            <div className="w-9/12 md-lg:8/12  md:w-full ">
              <div className="pl-8 md:pl-0">
                <div className="py-4 bg-white mb-10 px-3 rounded-md flex justify-between items-start border ">
                  <h2 className="text-lg font-medium text-slate-600 ">
                    {totalProduct} Products
                  </h2>
                  <div className="flex justify-center items-center gap-3 ">
                    <select
                    onChange={(e)=>setSortPrice(e.target.value)}
                      className="p-2  border outline-0 text-slate-600 font-semibold rounded-sm  "
                      name=""
                      id=""
                    >
                      <option value="">Sort By</option>
                      <option value="low-to-high">Low to High Price</option>
                      <option value="high-to-low">High to Low Price</option>
                    </select>
                    <div className="flex justify-center items-start gap-4 md-lg:hidden ">
                      <div
                        onClick={() => setStyles("grid")}
                        className={`p-2 ${
                          styles === "grid" && "bg-slate-300"
                        }text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm  `}
                      >
                        <IoGrid />
                      </div>

                      <div
                        onClick={() => setStyles("list")}
                        className={`p-2 ${
                          styles === "list" && "bg-slate-300"
                        }text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm  `}
                      >
                        <FaThList />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pb-8">
                  <ShopProducts products={products} styles={styles} />
                </div>

                <div>

                  {
                    totalProduct > parPage && <Pagination
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    totalItem={totalProduct}
                    parPage={parPage}
                    showItem={Math.floor(totalProduct / parPage)+1}
                  />
                  }
                  
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

export default Shops;
