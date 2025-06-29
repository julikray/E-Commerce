import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHomeBanner } from "../store/reducers/homeReducer";



const responsive = {

  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};



function Banner() {
  const dispatch = useDispatch()
    const {   banners } = useSelector(
      (state) => state.home
    );
  useEffect(()=>{
   dispatch(getHomeBanner())
  },[])
  return (
    <div className="w-full md-lg:mt-6  ">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full ">
            <div className="my-8  ">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
              >
                  {
                  banners.length > 0 && banners.map((b, i) => (
                  <Link className="lg-md:h-[440px] h-[470px]  w-full block "  key={i} to={`/product/details/${b.link}`}>
                    <img
                      src={b.banner}  
                      alt='banner image'
                      className="w-full h-full rounded-md object-fill"
                    />
                  </Link>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
