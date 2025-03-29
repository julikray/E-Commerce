import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/image/logo.png";
import { getNav } from "../navigation/index";
import { BiLogOut } from "react-icons/bi";

function Sidebar({showSidebar , setShowSidebar }) {
  const { pathname } = useLocation();

  const [allNav, setAllNav] = useState([]);
  useEffect(() => {
    const navs = getNav("seller");
    setAllNav(navs);
  }, []);
  // console.log(allNav)

  return (
    <div>
      <div onClick={() => setShowSidebar(false)} className={`flex duration-200 ${!showSidebar ? 'invisible': 'visible' } w-screen h-screen bg-[#836bca] top-0 left-0 z-10 fixed`} > 


      </div>

      <div
        className={`w-[260px] fixed bg-[#fefeff] border-r border-[#cacaca] z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0 '} `}
      >
        <div className="h-[70px] flex justify-center items-center ">
          <Link to="/" className="w-[180px] h-[50px] ">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="px-[16px] ">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link to={n.path} className={`${pathname === n.path ? ' bg-[#836bca] ' : 'text-[#6f6f70] font-bold duration-200 ' } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 ` }  >
                <span>{n.icon}</span>
                <span>{n.title}</span>
                </Link>
              </li>
            ))}

            <li>
              <button className="text-[#6f6f70] font-bold duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 " >
                <span> <BiLogOut /> </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
