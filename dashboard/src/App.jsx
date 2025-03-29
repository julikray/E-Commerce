  import React, { useEffect, useState } from "react";
import Router from "./router/Router.jsx";
import publicRoutes from "./router/routes/publicRoutes.jsx";
import { getRoutes } from "./router/routes/index.jsx";


function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes)

  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes((prevRoutes) => [...prevRoutes, ...routes]);
  }, []);
  
  return <Router allRoutes={allRoutes} />;
}

export default App;



