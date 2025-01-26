import React from "react";
import { Route } from "react-router-dom";
import NotAuthenticated from "../pages/401";
import { getCookie } from "../utils/cookie";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const isAuthenticated: boolean = getCookie("token").split("=")[1].length > 0;

    return isAuthenticated ? <Component {...props} /> : <NotAuthenticated />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
