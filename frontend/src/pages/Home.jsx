import React from "react";
import Headers from "../components/Headers";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProducts from "../components/products/FeatureProducts";
import Products from "../components/products/Products";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="w-full ">
      <Headers />
      <Banner />
      <div className="my-4">
        <Categorys />
      </div>
      <div className="py-[45px]">
        <FeatureProducts />
      </div>

      <div className="py-10">
        <div className="w-[85%] flex flex-wrap mx-auto" >
          <div className="grid w-full grid-cols-3 md:grid-cols-1 xs:grid-cols-1 gap-7 " >
            <div className="overflow-hidden " >
              <Products title='Latest Products' />
            </div>

            <div className="overflow-hidden " >
              <Products title='Top Rated Products'  />
            </div>

            <div className="overflow-hidden " >
              <Products title='Discount Products'  />
            </div>

          </div>

        </div>
      </div>

      {/* <Footer/> */}

    </div>
  );
}

export default Home;
