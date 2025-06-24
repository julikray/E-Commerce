import { lazy } from "react";

const AdminDashboard = lazy(() => import("../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("../../views/admin/Orders"));
const Category = lazy(() => import("../../views/admin/Category"));
const Seller = lazy(() => import("../../views/admin/Seller"));
const PaymentRequest = lazy(() => import("../../views/admin/PaymentRequest") )
const DeactiveSeller = lazy(() => import("../../views/admin/DeactiveSeller"))
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"))
const SellerDetails = lazy(() => import("../../views/admin/SellerDetails"))
const Chat = lazy(() => import("../../views/admin/Chat"))
const OrdersDetails = lazy(() => import("../../views/admin/OrdersDetails"))
 
export const adminRoutes = [
  {
    path: "admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
  {
    path: "admin/dashboard/category",
    element: <Category />,
    role: "admin",
  },
  {
    path: "admin/dashboard/sellers",
    element: <Seller/> ,
    role: "admin",
  },
  {
    path : "admin/dashboard/payment-request",
    element: <PaymentRequest/>,
    role: "admin",
  },
  {
    path : "admin/dashboard/deactive-sellers",
    element: <DeactiveSeller/> ,
    role: "admin",
  },
  {
    path : "admin/dashboard/sellers-request",
    element: <SellerRequest/> ,
    role: "admin",
  },
  {
    path : "admin/dashboard/seller/details/:sellerId",
    element: <SellerDetails/> ,
    role: "admin",
  },
  {
    path : "admin/dashboard/live-chat",
    element: <Chat/> ,
    role: "admin",
  },
   {
    path : "admin/dashboard/live-chat/:sellerId",
    element: <Chat/> ,
    role: "admin",
  },
  {
    path : "admin/dashboard/order/details/:orderId",
    element: <OrdersDetails/> ,
    role: "admin",
  }
];


