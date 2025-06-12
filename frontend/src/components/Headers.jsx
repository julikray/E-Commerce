import React, { useState } from "react";
import { IoIosArrowDown, IoMdMail } from "react-icons/io";
import { FaFacebookF, FaHeart, FaList, FaUser } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";
import { useSelector } from "react-redux";

function Headers() {
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { cardProductsCount } = useSelector((state) => state.card);

  const { pathname } = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [category, setCategory] = useState(true);
  const user = false;
  const wishlistCount = 5;
  const [searchValue, setSearchValue] = useState("");

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirectCardPage = () => {
    if (userInfo) {
      navigate("/card");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full ">
      <div className="header-top bg-[#EEEEEF] md-lg:hidden ">
        <div className="w-[85%] lg:w-[90%] mx-auto ">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500 ">
            <ul className="flex justify-start items-center gap-4 ">
              <li className="flex justify-center items-center gap-2 text-sm ">
                <span>
                  <IoMdMail />
                </span>
                <span>e-commerce@gmail.com</span>
              </li>
              <div className="w-[1px] h-[18px] bg-[#afafaf]" />
              <span>E-commerce</span>
            </ul>

            <div>
              <div className="flex justify-center items-center gap-4 ">
                <div className="flex justify-center items-center gap-4 ">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaLinkedinIn />
                  </a>
                  <a href="#">
                    <FaGithub />
                  </a>
                </div>

                <div className="w-[1px] h-[18px] bg-[#afafaf]" />

                {userInfo ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm "
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>{userInfo.name} </span>
                  </Link>
                ) : (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm "
                    to="/login"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-blue">
        <div className="w-[85%] lg:w-[90%] mx-auto ">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap ">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4 ">
              <div className="flex justify-between items-center ">
                <Link to="/">
                  <img className="h-[90px]" src={logo} alt="Logo" />
                </Link>

                <div
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer  lg:hidden  md-lg:flex xl:hidden hidden   "
                  onClick={() => setShowSidebar(false)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>
            <div className="md-lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8 ">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden ">
                  <li>
                    <Link
                      to="/"
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#836bca] " : "text-[#6f6f70]"
                      } `}
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/shops"
                      className={`p-2 block ${
                        pathname === "/shop"
                          ? "text-[#836bca]"
                          : "text-[#6f6f70]"
                      } `}
                    >
                      Shop
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/blog"
                          ? "text-[#836bca]"
                          : "text-[#6f6f70]"
                      } `}
                    >
                      Blog
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#836bca]"
                          : "text-[#6f6f70]"
                      } `}
                    >
                      About
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#836bca]"
                          : "text-[#6f6f70]"
                      } `}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>

                <div className="flex md-lg:hidden justify-center items-center gap-5 ">
                  <div className="flex justify-center gap-5 ">
                    <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#EEEEEF]">
                      <span className="text-xl text-[#6f6f70]">
                        <FaHeart />
                      </span>

                      <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                        {wishlistCount}
                      </div>
                    </div>

                    <div
                      onClick={redirectCardPage}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#EEEEEF]"
                    >
                      <span className="text-xl text-[#6f6f70]">
                        <BsCartFill />
                      </span>

                      {cardProductsCount !== 0 && (
                        <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                          {cardProductsCount}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md-lg:block ">
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all ${
            showSidebar ? "invisible" : "visible"
          } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 `}
        >
          <div
            className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
              showSidebar ? "-left-[300px] " : "left-0 top-0"
            } overflow-auto bg-white h-screen py-6 px-8 `}
          >
            <div className="flex justify-start flex-col gap-6 ">
              <Link to="/" className="w-[180px] h-[50px] ">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="flex justify-start flex-col mt-5 ">
              {userInfo ? (
                <Link
                  className="flex cursor-pointer justify-start  gap-2 text-sm "
                  to="/dashboard"
                >
                  <span className="flex justify-center items-center">
                    <FaUser />
                  </span>
                  <span>{userInfo.name}</span>
                </Link>
              ) : (
                <div className="flex cursor-pointer justify-start  gap-2 text-sm ">
                  <span>
                    <FaUser />
                  </span>
                  <span>Login</span>
                </div>
              )}
            </div>

            <ul className="flex flex-col justify-start mt-5 gap-8 text-sm font-bold uppercase  ">
              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/" ? "text-[#836bca] " : "text-[#6f6f70]"
                  } `}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/shop" ? "text-[#836bca]" : "text-[#6f6f70]"
                  } `}
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/blog" ? "text-[#836bca]" : "text-[#6f6f70]"
                  } `}
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/about" ? "text-[#836bca]" : "text-[#6f6f70]"
                  } `}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  className={`py-2 block ${
                    pathname === "/contact"
                      ? "text-[#836bca]"
                      : "text-[#6f6f70]"
                  } `}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] mx-auto ">
        <div className="flex w-full flex-wrap md-lg:gap-8  ">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setCategory(!category)}
                className="h-[50px] bg-[#836bca] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer rounded-md "
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />{" "}
                  </span>
                  <span>All Category</span>
                </div>
                <span className="pt-1">
                  <IoIosArrowDown />
                </span>
              </div>

              <div
                className={`${
                  category ? "h-0" : `h-[400px]`
                } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-[#ae88f1]  w-full border-0 rounded-b-md `}
              >
                <ul className="py-2 font-medium h-full overflow-auto  ">
                  {categorys.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px] "
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-[30px] h-[30px] rounded-md overflow-hidden "
                        />
                        <Link
                          to={`/products?category=${c.name} `}
                          className="text-sm block "
                        >
                          {c.name}{" "}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full   ">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full ">
                <div className="flex border h-[50px] items-center relative gap-6 rounded-md ">
                  <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden ">
                    <select
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none "
                      name=""
                      id=""
                    >
                      <option value="">Select Category </option>
                      {categorys.map((c, i) => (
                        <option key={i} value={c.name}>
                          {" "}
                          {c.name}{" "}
                        </option>
                      ))}
                    </select>
                  </div>

                  <input
                    className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full "
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    name=""
                    id=""
                    placeholder="What do you need?"
                  />

                  <button
                    onClick={search}
                    className="bg-[#836bca] right-0 absolute px-8 h-full font-semibold uppercase text-white "
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Headers;

// import React, { useState } from "react";
// import { IoIosArrowDown, IoMdMail } from "react-icons/io";
// import { FaFacebookF, FaHeart, FaList, FaUser } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaLinkedinIn } from "react-icons/fa6";
// import { FaGithub } from "react-icons/fa6";
// import { BsCartFill } from "react-icons/bs";
// import { Link, useLocation } from "react-router-dom";
// import logo from "../assets/image/logo.png";

// function Headers() {
//   const { pathname } = useLocation();
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [category, setCategory] = useState(true);
//   const user = true;
//   const wishlistCount = 5;

//   const categoryList = [
//     "Mobiles",
//     "Laptops",
//     "Speakers",
//     "Mobiles",
//     "Laptops",
//     "Speakers",
//     "Mobiles",
//     "Laptops",
//     "Speakers",
//   ];

//   console.log(pathname);

//   const [searchValue, setSearchValue] = useState("");

//   return (
//     <div className="w-full ">
//       <div className="header-top bg-[#EEEEEF] md-lg:hidden ">
//         <div className="w-[85%] lg:w-[90%] mx-auto ">
//           <div className="flex w-full justify-between items-center h-[50px] text-slate-500 ">
//             <ul className="flex justify-start items-center gap-4 ">
//               <li className="flex justify-center items-center gap-2 text-sm ">
//                 <span>
//                   <IoMdMail />
//                 </span>
//                 <span>e-commerce@gmail.com</span>
//               </li>
//               <div className="w-[1px] h-[18px] bg-[#afafaf]" />
//               <span>E-commerce</span>
//             </ul>

//             <div>
//               <div className="flex justify-center items-center gap-4 ">
//                 <div className="flex justify-center items-center gap-4 ">
//                   <a href="#">
//                     <FaFacebookF />
//                   </a>
//                   <a href="#">
//                     <FaTwitter />
//                   </a>
//                   <a href="#">
//                     <FaLinkedinIn />
//                   </a>
//                   <a href="#">
//                     <FaGithub />
//                   </a>
//                 </div>

//                 <div className="w-[1px] h-[18px] bg-[#afafaf]" />

//                 {user ? (
//                   <Link
//                     className="flex cursor-pointer justify-center items-center gap-2 text-sm "
//                     to="/dashboard"
//                   >
//                     <span>
//                       <FaUser />
//                     </span>
//                     <span>Juli kumari</span>
//                   </Link>
//                 ) : (
//                   <div className="flex cursor-pointer justify-center items-center gap-2 text-sm ">
//                     <span>
//                       <FaUser />
//                     </span>
//                     <span>Login</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-blue">
//         <div className="w-[85%] lg:w-[90%] mx-auto ">
//           <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap ">
//             <div className="md-lg:w-full w-3/12 md-lg:pt-4 ">
//               <div className="flex justify-between items-center ">
//                 <Link to="/">
//                   <img   src={logo} alt="Logo" />
//                 </Link>

//                 <div
//                   className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer  lg:hidden  md-lg:flex xl:hidden hidden   "
//                   onClick={() => setShowSidebar(false)}
//                 >
//                   <span>
//                     <FaList />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="md-lg:w-full w-9/12">
//               <div className="flex justify-between md-lg:justify-center items-center flex-wrap  ">
//                 {/* <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden ">
//                   <li>
//                     <Link
//                       className={`p-2 block ${
//                         pathname === "/" ? "text-[#836bca] " : "text-[#6f6f70]"
//                       } `}
//                     >
//                       Home
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       className={`p-2 block ${
//                         pathname === "/shop"
//                           ? "text-[#836bca]"
//                           : "text-[#6f6f70]"
//                       } `}
//                     >
//                       Shop
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       className={`p-2 block ${
//                         pathname === "/blog"
//                           ? "text-[#836bca]"
//                           : "text-[#6f6f70]"
//                       } `}
//                     >
//                       Blog
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       className={`p-2 block ${
//                         pathname === "/about"
//                           ? "text-[#836bca]"
//                           : "text-[#6f6f70]"
//                       } `}
//                     >
//                       About
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       className={`p-2 block ${
//                         pathname === "/contact"
//                           ? "text-[#836bca]"
//                           : "text-[#6f6f70]"
//                       } `}
//                     >
//                       Contact
//                     </Link>
//                   </li>
//                 </ul> */}

//                 <div className="w-[85%] lg:w-[90%] mx-auto ">
//                   <div className="flex w-full flex-wrap md-lg:gap-8  ">
//                     {/* <div className="w-3/12 md-lg:w-full">
//                       <div className="bg-white relative">
//                         <div
//                           onClick={() => setCategory(!category)}
//                           className="h-[50px] bg-[#836bca] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer "
//                         >
//                           <div className="flex justify-center items-center gap-3">
//                             <span>
//                               <FaList />{" "}
//                             </span>
//                             <span>All Category</span>
//                           </div>
//                           <span className="pt-1">
//                             <IoIosArrowDown />
//                           </span>
//                         </div>

//                         <div
//                           className={`${
//                             category ? "h-0" : `h-[400px]`
//                           } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-[#ae88f1]  w-full border-0 `}
//                         >
//                           <ul className="py-2 font-medium ">
//                             {categoryList.map((c, i) => {
//                               return (
//                                 <li
//                                   key={i}
//                                   className="flex justify-center items-center gap-2 px-[24px] py-[6px] "
//                                 >
//                                   <Link className="text-sm">{c} </Link>
//                                 </li>
//                               );
//                             })}
//                           </ul>
//                         </div>
//                       </div>
//                     </div> */}

//                     <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full ">
//                       <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
//                         <div className="w-8/12 md-lg:w-full ">
//                           <div className="flex border h-[50px] items-center relative gap-6 ">
//                             <div className="relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] after:-right-[15px] md:hidden ">
//                               <select
//                                 className="w-[150px] text-slate-600 font-semibold bg-transparent px-2 h-full outline-0 border-none "
//                                 name=""
//                                 id=""
//                               >
//                                 <option value="">Select Category </option>
//                                 {categoryList.map((c, i) => (
//                                   <option value={c}> {c} </option>
//                                 ))}
//                               </select>
//                             </div>

//                             <input
//                               className="w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full "
//                               onChange={(e) => setSearchValue(e.target.value)}
//                               type="text"
//                               name=""
//                               id=""
//                               placeholder="What do you need?"
//                             />

//                             <button className="bg-[#836bca] right-0 absolute px-8 h-full font-semibold uppercase text-white ">
//                               Search
//                             </button>
//                           </div>
//                         </div>

//                         {/* <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0 " >

//               </div> */}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex md-lg:hidden justify-center items-center gap-5 ">
//                   <div className="flex justify-center gap-5 ">
//                     <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#EEEEEF]">
//                       <span className="text-xl text-[#6f6f70]">
//                         <FaHeart />
//                       </span>

//                       <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
//                         {wishlistCount}
//                       </div>
//                     </div>

//                     <div className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#EEEEEF]">
//                       <span className="text-xl text-[#6f6f70]">
//                         <BsCartFill />
//                       </span>

//                       <div className="w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
//                         {wishlistCount}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="hidden md-lg:block ">
//         <div
//           onClick={() => setShowSidebar(true)}
//           className={`fixed duration-200 transition-all ${
//             showSidebar ? "invisible" : "visible"
//           } hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 `}
//         >
//           <div
//             className={`w-[300px] z-[9999] transition-all duration-200 fixed ${
//               showSidebar ? "-left-[300px] " : "left-0 top-0"
//             } overflow-auto bg-white h-screen py-6 px-8 `}
//           >
//             <div className="flex justify-start flex-col gap-6 ">
//               <Link to="/" className="w-[180px] h-[50px] ">
//                 <img src={logo} alt="Logo" />
//               </Link>
//             </div>

//             <div className="flex justify-start flex-col mt-5 ">
//               {user ? (
//                 <Link
//                   className="flex cursor-pointer justify-start  gap-2 text-sm "
//                   to="/dashboard"
//                 >
//                   <span className="flex justify-center items-center">
//                     <FaUser />
//                   </span>
//                   <span>Juli kumari</span>
//                 </Link>
//               ) : (
//                 <div className="flex cursor-pointer justify-start  gap-2 text-sm ">
//                   <span>
//                     <FaUser />
//                   </span>
//                   <span>Login</span>
//                 </div>
//               )}
//             </div>

//             <ul className="flex flex-col justify-start mt-5 gap-8 text-sm font-bold uppercase  ">
//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/" ? "text-[#836bca] " : "text-[#6f6f70]"
//                   } `}
//                 >
//                   Home
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/shop" ? "text-[#836bca]" : "text-[#6f6f70]"
//                   } `}
//                 >
//                   Shop
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/blog" ? "text-[#836bca]" : "text-[#6f6f70]"
//                   } `}
//                 >
//                   Blog
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/about" ? "text-[#836bca]" : "text-[#6f6f70]"
//                   } `}
//                 >
//                   About
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   className={`py-2 block ${
//                     pathname === "/contact"
//                       ? "text-[#836bca]"
//                       : "text-[#6f6f70]"
//                   } `}
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default Headers;
