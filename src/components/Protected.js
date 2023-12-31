import React, { useEffect, useState } from "react";
import { getAuthApi } from "../Api/service";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/Constant";
const Protected = ({ Component }) => {
  let Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  let getAdminAuth = async () => {
    try {
      let res = await fetch(`${baseUrl}adminAuth`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status === 401 || res.status === 403) {
        Navigate("/admin-login");
        return;
      } else {
        setisLoading(false);
        return;
      }
    } catch (error) {
      setisLoading(false);
    }
  };

  useEffect(() => {
    getAdminAuth();
  });
  if (isLoading) {
    return <div></div>;
  }
  return <Component />;
};

export default Protected;
