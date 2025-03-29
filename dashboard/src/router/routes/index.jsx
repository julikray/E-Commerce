import MainLayout from "../../layout/MainLayout.jsx"
import { privateRoutes } from "./privateRoutes.jsx"


export const getRoutes = () =>[
    {
        path:'/',
        element : <MainLayout />,
       
        children : privateRoutes,
    }
]



// import { Suspense } from "react";
// import MainLayout from "../../layout/MainLayout.jsx";
// import { privateRoutes } from "./privateRoutes.js";

// export const getRoutes = () => [
//   {
//     path: '/',
//     element: (
//       <Suspense fallback={<div>Loading...</div>}>
//         <MainLayout />
//       </Suspense>
//     ),
//     children: privateRoutes,
//   }
// ];
