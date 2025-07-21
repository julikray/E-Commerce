import React from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers, FaCartPlus, FaRupeeSign } from "react-icons/fa";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import profileimg from "../../assets/image/profileimg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminReqDashboardIndex } from "../../store/Reducers/dashboardIndexReducer";
import moment from 'moment'


function AdminDashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    totalSale,
    totalOrder,
    totalProduct,
    totalPendingOrder,
    totalSeller,
    recentOrders,
    recentMessage,
  } = useSelector((state) => state.dashboardIndex);

  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 45, 56, 67, 87, 56, 45, 45, 56, 67, 37],
      },
      {
        name: "Revenue",
        data: [23, 45, 56, 67, 37, 34, 45, 56, 67, 37, 52, 25],
      },
      {
        name: "Sellers",
        data: [23, 34, 15, 45, 56, 67, 37, 26, 60, 37, 52, 25],
      },
    ],

    options: {
      colors: ["#ae88f1", "#836bca", "#584ea2"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent ",
        foreColor: "#a9a8a8",
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#a9a8a8",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminReqDashboardIndex());
  }, []);

  return (
    <div className="px-2 md:px-7 py-5 ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 ">
        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">₹ {totalSale} </h2>
            <span className="text-md font-medium ">Total Salse</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full  flex justify-center items-center text-xl">
            <FaRupeeSign />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">{totalProduct} </h2>
            <span className="text-md font-medium ">Products</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full  flex justify-center items-center text-xl">
            <MdOutlineProductionQuantityLimits />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold "> {totalSeller} </h2>
            <span className="text-md font-medium ">Sellers</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full flex justify-center items-center text-xl">
            <FaUsers />
          </div>
        </div>

        <div className="flex justify-between items-center p-5 bg-[#fefeff] rounded-md gap-3 ">
          <div className="flex flex-col justify-start items-start text-[#5c5a5a] ">
            <h2 className="text-3xl font-bold ">{totalOrder} </h2>
            <span className="text-md font-medium ">Orders</span>
          </div>

          <div className="w-[40px] h-[47px] rounded-full   flex justify-center items-center text-xl">
            <FaCartPlus />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap mt-7 ">
        <div className="w-full lg:w-7/12 lg:pr-3 ">
          <div className="w-full bg-[#fefeff] p-4 rounded-md border border-[#d2d3d2] ">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>

        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0   ">
          <div className="w-full bg-[#fefeff] p-4 rounded-md text-[#d0d2d6] ">
            <div className="flex justify-between items-center ">
              <h2 className="font-semibold text-lg text-[#6f6f70] pb-3 ">
                Recent Seller Message
              </h2>
              <Link to='/admin/dashboard/live-chat' className="font-semibold text-sm text-[#6f6f70] ">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-2 pt-6 text-[#6f6f70] ">
              <ol className="relative ml-4 ">
                {recentMessage.map((n, i) => (
                  <li className="mb-3 ml-6 ">
                    <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#836bca] rounded-full z-10 ">
                      {n.senderId === userInfo._id ? (
                        <img
                          className="  w-full rounded-full h-full bg-white  "
                          src={userInfo.image}
                          alt="profileimg"
                        />
                      ) : (
                        <img
                          className="  w-full rounded-full h-full bg-white  "
                          src={profileimg}
                          alt="profileimg"
                        />
                      )}
                    </div>

                    <div className="p-3 rounded-lg border border-[#cfcfcf] shadow-sm ">
                      <div className="flex justify-between items-center mb-2 ">
                        <Link className="text-md font-normal  ">
                          {n.senderName}{" "}
                        </Link>
                        <time className="md-1 text-sm font-normal sm:order-last sm:md-0   ">
                          {moment(n.createdAt).startOf("hour").fromNow()}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-[#ae88f1] rounded-lg border-[#584ea2] text-black ">
                        {n.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-4 bg-[#fefeff] rounded-md mt-6 border border-[#d2d3d2] ">
        <div className="flex justify-between items-center ">
          <h2 className="font-semibold text-lg text-[#6f6f70] pb-3 ">
            Recent Orders
          </h2>
          <Link to='/admin/dashboard/orders' className="font-semibold text-sm text-[#6f6f70] ">
            View All
          </Link>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#6f6f70]  ">
            <thead className="text-sm text-[#6f6f70] uppercase border-b border-slate-700 ">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>

            <tbody>
              {
                           recentOrders.map((d,i) => 
                             <tr key={i} >
                           <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap" >#{d._id} </td>
                           <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap" >Rs {d.price} </td>
                           <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap" > {d.deliveryStatus } </td>
                           <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap" >{d.paymentStatus} </td>
                           <td scope="row" className="py-3 px-4 font-medium whitespace-nowrap" >
                             <Link to={`/admin/dashboard/order/details/${d._id}`} >View</Link>
                             
                             </td>
                           </tr>)
                          }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
