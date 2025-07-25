import { AiOutlineDashboard ,AiOutlineShoppingCart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { FaUsers, FaUserTimes } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import { MdOutlineDiscount } from "react-icons/md";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoChatbubblesSharp } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";



export const allNav = [
    {
        id : 1,
        title : 'Dashboard',
        icon : <AiOutlineDashboard />,
        role : 'admin',
        path : '/admin/dashboard'
    },
    {
        id : 2,
        title : 'Orders',
        icon : <AiOutlineShoppingCart />,
        role : 'admin',
        path : '/admin/dashboard/orders'
    },
    {
        id : 3,
        title : 'Category',
        icon : <BiCategory />,
        role : 'admin',
        path : '/admin/dashboard/category'
    },
    {
        id : 4,
        title : 'Sellers',
        icon : <FaUsers />,
        role : 'admin',
        path : '/admin/dashboard/sellers'
    },
    {
        id : 5,
        title : 'Payment Request',
        icon : <MdPayment />,
        role : 'admin',
        path : '/admin/dashboard/payment-request'
    },
    {
        id : 6,
        title : 'Deactive Sellers',
        icon : <FaUserTimes />,
        role : 'admin',
        path : '/admin/dashboard/deactive-sellers'
    },
    {
        id : 7,
        title : 'Sellers Request',
        icon : <FaCodePullRequest />,
        role : 'admin',
        path : '/admin/dashboard/sellers-request'
    },
    {
        id : 8,
        title : 'Live Chat',
        icon : <IoChatbubbleEllipses />,
        role : 'admin',
        path : '/admin/dashboard/live-chat'
    },
    {
        id : 9,
        title : 'Dashboard',
        icon : <AiOutlineDashboard />,
        role : 'seller',
        path : '/seller/dashboard'
    },
    {
        id : 10,
        title : 'Add Product',
        icon : <IoAdd />,
        role : 'seller',
        path : '/seller/dashboard/addProduct'
    },
    {
        id : 11,
        title : 'All Product',
        icon : <FaListUl />,
        role : 'seller',
        path : '/seller/dashboard/product'
    },
    // {
    //     id : 12,
    //     title : 'Discount Product',
    //     icon : <MdOutlineDiscount />,
    //     role : 'seller',
    //     path : '/seller/dashboard/discountProduct'
    // },
    {
        id :13,
        title : 'Orders',
        icon : <BsFillCartPlusFill />,
        role : 'seller',
        path : '/seller/dashboard/orders'
    },
    {
        id :14,
        title : 'Payments',
        icon : <MdPayment />,
        role : 'seller',
        path : '/seller/dashboard/payments'
    },
    {
        id :15,
        title : 'Chat Customer',
        icon : <IoChatbubblesSharp />,
        role : 'seller',
        path : '/seller/dashboard/chatCustomer'
    },
    {
        id :16,
        title : 'Chat Support',
        icon : <BsChatDotsFill />,
        role : 'seller',
        path : '/seller/dashboard/chatSupport'
    },
    {
        id :17,
        title : 'Profile',
        icon : <CgProfile />,
        role : 'seller',
        path : '/seller/dashboard/profile'
    }
]