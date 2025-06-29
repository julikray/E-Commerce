import { lazy } from "react";

const SellerDashboard = lazy(() =>
  import("../../views/seller/SellerDashboard.jsx")
);
const AddProduct = lazy(() => import("../../views/seller/AddProduct.jsx"));
const Product = lazy(() => import("../../views/seller/Product.jsx"));
const DiscountProducts = lazy(() =>
  import("../../views/seller/DiscountProducts.jsx")
);
const Orders = lazy(() => import("../../views/seller/Orders.jsx"));
const Payments = lazy(() => import("../../views/seller/Payments.jsx"));
const SellerToAdmin = lazy(() =>
  import("../../views/seller/SellerToAdmin.jsx")
);
const SellerToCustomer = lazy(() =>
  import("../../views/seller/SellerToCustomer.jsx")
);
const Profile = lazy(() => import("../../views/seller/Profile.jsx"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct.jsx"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails.jsx"));
const Pending = lazy(() => import("../../views/Pending.jsx"));
const Deactive = lazy(() => import("../../views/Deactive.jsx"));
const AddBanner = lazy(() => import("../../views/seller/AddBanner.jsx"));


export const sellerRoutes = [
  {
    path: "/seller/account-pending",
    element: <Pending />,
    ability: "seller",
  },
  {
    path: "/seller/account-deactive",
    element: <Deactive />,
    ability: "seller",
  },
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/addProduct",
    element: <AddProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/product",
    element: <Product />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/edit-product/:productId",
    element: <EditProduct />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/discountProduct",
    element: <DiscountProducts />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/orders",
    element: <Orders />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/order/details/:orderId",
    element: <OrderDetails />,
    role: "seller",
    visibility: ["active", "deactive"],
  },
  {
    path: "/seller/dashboard/payments",
    element: <Payments />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chatSupport",
    element: <SellerToAdmin />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/chatCustomer/:customerId",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/chatCustomer",
    element: <SellerToCustomer />,
    role: "seller",
    status: "active",
  },
  {
    path: "/seller/dashboard/profile",
    element: <Profile />,
    role: "seller",
    visibility: ["active", "deactive", "pending"],
  },
  {
    path: "/seller/dashboard/addBanner/:productId",
    element: <AddBanner />,
    role: "seller",
    status: "active",
  },

];
