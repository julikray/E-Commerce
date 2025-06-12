import React, { useEffect } from "react";
import Headers from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";
import {  useDispatch, useSelector } from 'react-redux';
import { getCategory, getProduct } from "../store/reducers/homeReducer";

function Home() {

  const dispatch = useDispatch()
  const {  products , latestProducts ,topRatedProducts , discountProducts } = useSelector(state=>state.home)
  useEffect(()=> {
    dispatch(getCategory())
    dispatch(getProduct())
  },[])

  return (
    <div className="w-full ">
      <Headers  />
      <Banner />
      <div className="my-4 ">
        <Categorys  />
      </div>
      <div className="py-[45px]">
        <FeatureProducts products={products} />
      </div>

      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto" >
          <div className="grid w-full grid-cols-3 md:grid-cols-1 xs:grid-cols-1 gap-7 " >
            <div className="overflow-hidden " >
              <Products title='Latest Products' products={latestProducts} />
            </div>

            <div className="overflow-hidden " >
              <Products title='Top Rated Products' products={topRatedProducts} />
            </div>

            <div className="overflow-hidden " >
              <Products title='Discount Products' products={discountProducts}  />
            </div>

          </div>

        </div>
      </div>

      <Footer/>

    </div>
  );
}

export default Home;
