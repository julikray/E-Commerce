// import MainLayout from "../../layout/MainLayout.jsx"
// import { privateRoutes } from "./privateRoutes.jsx"
// import ProtectRoute from "./ProtectRoute.jsx"


// export const getRoutes = () =>{

//     privateRoutes.map(r => {
//         r.element = <ProtectRoute route={r} >{r.element} </ProtectRoute>
//     })



//     return {
//         path:'/',
//         element : <MainLayout />,
       
//         children : privateRoutes,
//     }
// }



import MainLayout from "../../layout/MainLayout.jsx";
import { privateRoutes } from "./privateRoutes.jsx";
import ProtectRoute from "./ProtectRoute.jsx";

export const getRoutes = () => {
    
    privateRoutes.map(r => {
        r.element = <ProtectRoute route={r}>{r.element}</ProtectRoute>;
        return r;  
    });

     
    return [
        {
            path: '/',
            element: <MainLayout />,
            children: privateRoutes, 
        }
    ];
};


