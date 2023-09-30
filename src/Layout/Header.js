import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <nav
        id="navbar-main"
        className="navbar-top  navbar-dark navbar navbar-expand-md"
      >
        <div className="container-fluid">
          <NavLink
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="#"
          >
            Dashboard
          </NavLink>

          <ul className="align-items-center d-none d-md-flex navbar-nav">
            <li className="dropdown nav-item">
              <a
                aria-haspopup="true"
                href="#"
                className="pr-0 nav-link"
                aria-expanded="false"
              >
                <div className="align-items-center media">
                  <div className="ml-2 d-none d-lg-block media">
                    <span className="mb-0 text-sm font-weight-bold color-w">
                      {/* {myData.name} */}
                    </span>
                  </div>
                </div>
              </a>
              {/* Profile Dropdown */}

              {/*  */}

              <div
                tabIndex={-1}
                role="menu"
                aria-hidden="true"
                className="dropdown-menu-arrow dropdown-menu dropdown-menu-right"
              >
                <div tabIndex={-1} className="noti-title dropdown-header">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <Link
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                  to="/profile"
                >
                  <i className="ni ni-single-02" />
                  <span>My profile</span>
                </Link>
                <Link
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                  to="/profile"
                >
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </Link>

                <div tabIndex={-1} className="dropdown-divider" />
                <a
                  href="javascript:void(0)"
                  tabIndex={0}
                  role="menuitem"
                  className="dropdown-item"
                >
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
