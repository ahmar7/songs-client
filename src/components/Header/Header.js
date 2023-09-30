import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-search">
        <form
          target="_blank"
          method="get"
          className="searchform"
          id="search-form"
          action="https://www.isongs.info/"
          role="search"
        >
          <input
            type="search"
            className="search-field field"
            placeholder="Search …"
            title="Search for:"
          />
          <input type="hidden" name="label" defaultValue="telugu" />
          <button id="search">♪</button>
        </form>
      </div>
      <div className="site-branding clearfix" itemScope="itemscope">
        <div id="logo">
          <h1 className="site-title" itemProp="name">
            <Link to="/" itemProp="url" rel="home">
              Naa Songs
            </Link>
          </h1>
          <div className="site-description" itemProp="description">
            Telugu Songs Download
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
