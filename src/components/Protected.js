import React, { useEffect, useState } from "react";
import { getAuthApi } from "../Api/service";
import { useNavigate } from "react-router-dom";

const Protected = ({ Component }) => {
  let Navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const getAdminAuth = async () => {
    try {
      const updateAbout = await getAuthApi();
      if (updateAbout.success === false) {
        Navigate("/admin-login");

        return;
      }
    } catch (error) {
      alert(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
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
