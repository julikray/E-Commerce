import React, { useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link ,useNavigate   } from 'react-router-dom'
import { useDispatch ,useSelector } from "react-redux";
import {getDashboardIndexData} from '../../store/reducers/dashboardReducer'


function index() {

    const navigate = useNavigate();
    const {userInfo} = useSelector(state => state.auth)
    const { recentOrders, pendingOrder , totalOrder , cancelledOrder  } = useSelector(state => state.dashboard )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDashboardIndexData(userInfo.id))
    },[])

    const redirect = (ord) => {
        let items = 0;
        for(let i=0; i<ord.length; i++ ){
            items = ord.products[i].quantity + items
        }
        navigate('/payment' , {
            state : {
                price : ord.price,
                items,
                orderId : ord._id
            }
        })
    }

  return (
    <div>
        <div className='grid grid-cols-3 md:grid-cols-1 gap-5 ' >
            <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 ' >
                <div className='bg-green-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ' >
                    <span className='text-xl text-green-800 ' >
                        <FaShoppingCart/>
                    </span>

                </div>
                <div className='flex flex-col justify-start items-start text-slate-600 ' >
                    <h2 className='text-3xl font-bold ' >{totalOrder}</h2>
                    <span>Orders</span>

                </div>

            </div>

             <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 ' >
                <div className='bg-blue-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ' >
                    <span className='text-xl text-blue-800 ' >
                        <FaShoppingCart/>
                    </span>

                </div>
                <div className='flex flex-col justify-start items-start text-slate-600 ' >
                    <h2 className='text-3xl font-bold ' >{pendingOrder}</h2>
                    <span>Pending Orders</span>

                </div>

            </div>

             <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5 ' >
                <div className='bg-red-100 w-[47px] h-[47px] rounded-full flex justify-center items-center text-xl ' >
                    <span className='text-xl text-red-800 ' >
                        <FaShoppingCart/>
                    </span>

                </div>
                <div className='flex flex-col justify-start items-start text-slate-600 ' >
                    <h2 className='text-3xl font-bold ' >{cancelledOrder} </h2>
                    <span>Cancelled Orders</span>

                </div>

            </div>

        </div>

        <div className='bg-white p-4 mt-5 rounded-md ' >
            <h2 className='text-lg font-semibold text-slate-600 ' >Recent Orders</h2>
            <div className='pt-4' >
                <div className='relative overflow-x-auto ' >
                    <table className='w-full text-sm text-left text-gray-500 ' >
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50 ' >
                            <tr>
                                <th scope='col' className='px-6 py-3' >Order Id</th>
                                 <th scope='col' className='px-6 py-3' >Price</th>
                                  <th scope='col' className='px-6 py-3' >Payment Status</th>
                                   <th scope='col' className='px-6 py-3' >Order Status</th>
                                    <th scope='col' className='px-6 py-3' >Action</th>
                            </tr>

                        </thead>

                        <tbody>
                             {
                                recentOrders.map((o,i) =>   <tr key={i} >
                                <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'  >
                                   {o._id}
                                </td>
                                 <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'  >
                                    Rs {o.price}
                                </td>
                                 <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'  >
                                    {o.paymentStatus}
                                </td>
                                 <td scope='row' className='px-6 py-4 font-medium whitespace-nowrap'  >
                                    {o.deliveryStatus}
                                </td>
                                 <td scope='row' className='px-6 py-4  '  >
                                    <Link to={`/dashboard/order/details/${o._id}`} >
                                    <span className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded-md ' >view</span>
                                    </Link>
                                     <span onClick={()=>redirect(o)} className='bg-green-100 text-green-800 text-sm font-normal mr-2 px-2.5 py-[1px] rounded-md cursor-pointer ' >Pay Now</span>
                                </td>
                            </tr> )
                             }
                            
                           
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    </div>
  )
}

export default index