import { useEffect } from "react";
import { setCookie } from "../utils/cookie";

const Logout = () => {
  useEffect(() => {
    setCookie("token", "");
    location.replace("/login");
  }, []);

  return <></>;
};

export default Logout;
