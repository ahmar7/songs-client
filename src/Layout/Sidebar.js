import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./sideBar.css";
import { baseUrl } from "../utils/Constant";

const SideBar = () => {
  let Navigate = useNavigate();
  const [mblDash, setmblDash] = useState(false);
  let toggleDash = () => {
    if (mblDash === false) {
      setmblDash(true);
    } else {
      setmblDash(false);
    }
  };
  //
  const [isLoading, setisLoading] = useState(true);
  let Logout = async () => {
    try {
      let res = await fetch(`${baseUrl}logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // let data = JSON.parse(res
      if (res.status === 200) {
        Navigate("/admin-login");
      } else if (res.status === 500) {
        alert("Something went wrong, please try again later");
      }
    } catch (error) {
      alert(error);
    } finally {
      setisLoading(false);
    }
  };

  //
  return (
    <>
      <nav
        id="sidenav-main"
        className="navbar-vertical fixed-left navbar-light bg-white navbar navbar-expand-md"
      >
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" onClick={toggleDash}>
            <span className="navbar-toggler-icon" />
          </button>
          <Link className="pt-0 navbar-brand logo-name" to="/">
            Websit Name
          </Link>
          <ul className="align-items-center d-md-none nav">
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                href="#"
                className="nav-link"
                aria-expanded="false"
              >
                <div className="align-items-center media">
                  <span className="avatar avatar-sm rounded-circle"></span>
                </div>
              </a>
            </li>
          </ul>
          <div
            className={
              mblDash
                ? "collapse navbar-collapse active-mb"
                : "collapse navbar-collapse"
            }
          >
            <div className="navbar-collapse-header d-md-none">
              <div className="row">
                <div className="collapse-brand left-align col-6">
                  <Link to="/">
                    <h1 className="logo-name">Website Name</h1>
                  </Link>
                </div>
                <div className="collapse-close col-6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleDash}
                  >
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>

            <ul className="navbar-nav dash-head">
              <li className="nav-item">
                <NavLink
                  aria-current="page"
                  className="nav-link "
                  to="/show-all"
                >
                  <i className="ni ni-tv-2 text-primary" />
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add-movie">
                  <i className="fa-solid fa-plus text-success"></i>
                  Add Category
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/update-password">
                  <i className="fa-solid fa-plus text-success"></i>
                  Update Password
                </NavLink>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="javascript:void(0)"
                  onClick={Logout}
                >
                  <i className="fa-solid fa-right-from-bracket  text-pink"></i>
                  Logout
                </a>
              </li>
            </ul>
            <hr className="my-3" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
