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
      console.log(res);
      if (res.status === 401 || 403) {
        console.log("work", res);
        Navigate("/admin-login");
        return;
      }
      setisLoading(false);
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
  return (
    <>
      <Component />
    </>
  );
};

export default Protected;
