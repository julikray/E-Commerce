import { lazy } from "react";

const Home = lazy(() => import("../../views/Home.jsx"));
const SellerDashboard  = lazy(() => import("../../views/seller/SellerDashboard.jsx"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct.jsx"));
const Product = lazy(() => import("../../views/seller/Product.jsx") )
const DiscountProducts = lazy(()=> import("../../views/seller/DiscountProducts.jsx"))
const Orders = lazy(() => import("../../views/seller/Orders.jsx"))
const Payments = lazy(()=> import("../../views/seller/Payments.jsx"))
const SellerToAdmin = lazy(()=> import("../../views/seller/SellerToAdmin.jsx"))
const SellerToCustomer = lazy(()=> import("../../views/seller/SellerToCustomer.jsx"))
const Profile = lazy(()=> import("../../views/seller/Profile.jsx"))
const EditProduct = lazy(()=> import("../../views/seller/EditProduct.jsx") )



export const sellerRoutes = [
    {
        path: '/',
        element : <Home/>,
        ability : ['admin' , 'seller']
    },
    {
        path: '/seller/dashboard',
        element : <SellerDashboard/>,
        role: 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/addProduct',
        element : <AddProduct/>,
         role: 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/product',
        element : <Product/>,
         role: 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/edit-product/:productId',
        element : <EditProduct/>,
        role: 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/discountProduct',
        element : <DiscountProducts/>,
         role: 'seller',
        status : 'active'
    },
    {
        path: '/seller/dashboard/orders',
        element : <Orders/>,
         role: 'seller',
        status : ['active' , 'deactive']
    },
    {
        path: '/seller/dashboard/payments',
        element : <Payments/>,
        role: 'seller',
        status : 'active' ,
    },
    {
        path: '/seller/dashboard/chatSupport',
        element : <SellerToAdmin/>,
         role: 'seller',
        status : ['active' , 'deactive' , 'pending']
    },
    {
        path: '/seller/dashboard/chatCustomer/:customerId',
        element : <SellerToCustomer/>,
         role: 'seller',
        status :  'active' ,
    },
    {
        path: '/seller/dashboard/chatCustomer',
        element : <SellerToCustomer/>,
         role: 'seller',
        status :  'active' ,
    }
    ,
    {
        path: '/seller/dashboard/profile',
        element : <Profile/>,
         role: 'seller',
        status :  'active' ,
    }
]


