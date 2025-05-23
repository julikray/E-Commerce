import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import img1 from "../../assets/image/products/1.webp";
import img2 from "../../assets/image/products/2.webp";
import img3 from "../../assets/image/products/3.webp";
import img4 from "../../assets/image/products/4.webp";
import img5 from "../../assets/image/products/5.webp";
import img6 from "../../assets/image/products/6.webp";
import img7 from "../../assets/image/products/7.webp";
import img8 from "../../assets/image/products/8.webp";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

function Products({title } ) {
  const productImages = [img1, img2, img3, img4, img5, img6, img7, img8];

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

  const products = [
    [1, 2, 3]
    
  ];

const ButtonGroup = (next, previous) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-xl font-bold text-slate-600 " >
        {title}
      </div>

      <div className="flex justify-center items-center gap-3 text-slate-600 " >
        <button onClick={()=> previous() } className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200 " >
          <span><FaChevronLeft /></span>
        </button>
         <button onClick={()=> next() }  className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200 " >
          <span><FaChevronRight /> </span>
        </button>
      </div>
       
    </div>
  );
};


  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={false}
        infinite={false}
        arrows={false}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup/>}
      >
        {products.map((p, i) => (
          <div key={i} className="flex flex-col justify-start gap-2">
            {p.map((pl, j) => (
              <Link className="flex justify-start items-start " key={j} to="#">
                <img className="w-[110px] h-[110px] " src={productImages[pl - 1]} alt="" /> 
                <div className="px-3 flex justify-start items-start gap-1 flex-col text-slate-600 ">
                  <h2>TV panel jegjdgj ekjhgjk</h2>
                  <span className="text-lg font-bold">567</span>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Products;
