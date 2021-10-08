import React from "react";
import Imagelogo from "../../assets/img/bottom-logo.svg";

function Footer() {
  return (
    <div>
      <footer class="bottom">
        <div class="logo">
          <a href="/">
            <img src={Imagelogo} alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
