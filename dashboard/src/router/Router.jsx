import React from "react";
import { useRoutes } from "react-router-dom";

function Router({ allRoutes }) {
  const routes = useRoutes([...allRoutes]);
  return routes;
}

export default Router;




