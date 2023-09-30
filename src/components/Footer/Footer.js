import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer" className="site-footer clearfix">
      <div id="site-bottom" className="clearfix">
        <div className="copyright">
          <div className="left">
            © 2023
            <Link to="/" title="Telugu Songs Download" rel="home">
              Naa Songs
            </Link>
            . All rights reserved.
          </div>
          <div className="right">
            <a href="#">Contact</a> |<a href="#">DMCA</a> |
            <a href="#">T&amp;C</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
