// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { lazy } from "react";
// import "./index.css";
// import { Provider } from "react-redux";
// import store from "./store/index.js";
// import { Toaster } from 'react-hot-toast'

// const App = lazy(() => import("./App.jsx"));

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <Provider store={store}>
//       <App />
//       <Toaster 
//       toastOptions={{
//         position: "top-right",
//         style:{
//           background: "#283046",
//           color : "white"

//         }
//       }}
//       />

      
//     </Provider>
//   </BrowserRouter>
// );




import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";
import "./index.css";

const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            background: "#283046",
            color: "white"
          }
        }}
      />
    </Provider>
  </BrowserRouter>
);
