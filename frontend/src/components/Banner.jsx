import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import img1 from "../assets/image/banner/1.jpg";
import img2 from "../assets/image/banner/2.jpg";
import img3 from "../assets/image/banner/3.jpg";


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

const bannerImages = [img1, img2, img3];

function Banner() {
  return (
    <div className="w-full md-lg:mt-6">
      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="w-full flex flex-wrap md-lg:gap-8">
          <div className="w-full">
            <div className="my-8">
              <Carousel
                autoPlay={true}
                infinite={true}
                arrows={false}
                showDots={true}
                responsive={responsive}
              >
                  {bannerImages.map((image, i) => (
                  <Link className="lg-md:h-[440px] h-auto w-full block "  key={i} to="#">
                    <img
                      src={image}  
                      alt={`banner-${i}`}
                      className="w-full h-auto object-cover"
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
