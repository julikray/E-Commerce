import React, { useEffect } from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "./Ratings";
import { useDispatch ,useSelector } from "react-redux";
import { addToCard , messageClear , addToWishlist } from "../../store/reducers/cardReducer";
import { toast } from "react-toastify";


function FeatureProducts({products}) {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.auth)
    const { successMessage , errorMessage } = useSelector(state => state.card)

  const addCard = (id)=>{
    if(userInfo){
      dispatch(addToCard({
        userId: userInfo.id,
        quantity:1,
        productId: id
      }))
    }else{
      navigate('/login')
    }
    

  }


    useEffect(()=>{
        if(successMessage){
          toast.success(successMessage)
          dispatch(messageClear())
           
        }
          if(errorMessage){
            toast.error(errorMessage)
            dispatch(messageClear())
          }
        },[errorMessage , successMessage])


        const handleAddToWishlist  = (pro) => {
          // console.log(pro)
          dispatch(addToWishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            images: pro.images,
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
          }))

        }
  
 


  return (
    <div className="w-[85%] flex flex-wrap mx-auto ">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px] ">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#836bca] mt-4 "></div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-6 ">
        {products.map((p, i) => (
          <div key={i} className="border rounded-md group  transition-all duration-500 hover:shadow-md hover:-mt-3 ">
            <div className="relative overflow-hidden">
              {
                p.discount ? <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2 ">
                {p.discount}%
              </div> : ''
              }
              <img className="sm:w-full w-full h-[240px] object-contain  " src={p.images[0]} alt="Product image" />

              {/* <div className="w-full h-[400px] overflow-hidden">
                <img
                  className="w-full h-full object-fill "
                  src={productImages[i]}
                  alt={`Product ${p}`}
                />
              </div> */}

              <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3 ">
                <li onClick={()=> handleAddToWishlist(p)} className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaHeart />
                </li>
                <Link
                  className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all "
                  to={`/product/details/${p.slug}`}
                >
                  <FaEye />
                </Link>

                <li onClick={()=> addCard(p._id) } className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all">
                  <FaShoppingCart />
                </li>
              </ul>
            </div>
            <div className="py-3 text-slate-600 px-2 " >
              <h2>{p.name}</h2>
              <div className="flex justify-start items-center gap-3  " >
                <span className="text-lg font-bold " >{p.price} </span>
                <div className="flex" >
                  <Ratings ratings={p.rating} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureProducts;
