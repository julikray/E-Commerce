import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { FaList } from "react-icons/fa";
import { RiDashboardHorizontalFill, RiProductHuntLine } from "react-icons/ri";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { TfiLock } from "react-icons/tfi";
import { BiLogInCircle } from "react-icons/bi";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { user_reset } from "../store/reducers/authReducer";
import { reset_count } from "../store/reducers/cardReducer";

function Dashboard() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [filterShow, setFilterShow] = useState(false);

  const logout = async () => {

    try {
      const { data } = await api.get('/customer/logout')
      localStorage.removeItem('customerToken')
      dispatch(user_reset())
      dispatch(reset_count())
      navigate('/login')
    } catch (error) {
      console.log(error.response.data)
      
    }

  }

  return (
    <div>
      <Headers />
      <div className="bg-slate-200 mt-5 ">
        <div className="w-[90%] mx-auto pt-5 md-lg:block hidden ">
          <div>
            <button onClick={()=> setFilterShow(!filterShow) } className="text-center py-3 px-3 bg-indigo-500 text-white ">
              <FaList />
            </button>
          </div>
        </div>

        <div className="h-full mx-auto ">
          <div className="py-5 flex md-lg:w-[90%] mx-auto relative ">
            <div
              className={`rounded-md z-50 md-lg:absolute ${
                filterShow ? "-left-4" : "-left-[360px] "
              } w-[270px] ml-4 bg-white `}
            >
              <ul className="py-2 text-slate-600 px-4 ">
                <li className="flex justify-start items-center gap-2 py-2 ">
                  <span>
                    <RiDashboardHorizontalFill />{" "}
                  </span>
                  <Link to="/dashboard" className="block">
                    Dashboard
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2 ">
                  <span>
                    <RiProductHuntLine />{" "}
                  </span>
                  <Link to="/dashboard/myOrders" className="block">
                    My Orders
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2 ">
                  <span>
                    <CiHeart />{" "}
                  </span>
                  <Link to="/dashboard/myWishlist" className="block">
                    Wishlist
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2 ">
                  <span>
                    <IoChatbubbleOutline />
                  </span>
                  <Link to="/dashboard/chat" className="block">
                    Chat
                  </Link>
                </li>

                <li className="flex justify-start items-center gap-2 py-2 ">
                  <span>
                    <TfiLock />
                  </span>
                  <Link to="/dashboard/changePassword" className="block">
                    Change Password
                  </Link>
                </li>

                <li onClick={logout} className="flex justify-start items-center gap-2 py-2  cursor-pointer ">
                  <span>
                    <BiLogInCircle />
                  </span>
                  <div className="block">LogOut</div>
                </li>
              </ul>
            </div>

            <div className="w-[calc(100%-270px)] md-lg:w-full ">
              <div className="mx-4 md-lg:mx-0 ">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
