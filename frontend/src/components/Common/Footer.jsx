import React from "react";
import Imagelogo from "../../assets/images/BGmatic-logo.svg";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer class="bottom">
        <div class="logo">
          <Link to={"/"}>
            <img src={Imagelogo} alt="" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
