import React from "react";

import Menu from "../common/Menu/Menu";
import "./Navigation.scss";

function Navigation() {
  return (
    <div className="navigation">
      <img
        className="insta-logo"
        src="/images/insta-logo.png"
        alt="imstagram logo"
      />
      <form className="search-wrap">
        <input className="search" type="text" required />

        <label className="search-lable">
          <span className="search-icon">
            <ion-icon name="search-outline"></ion-icon>
          </span>
          <span className="search-text">search</span>
        </label>
      </form>
      <div className="nav-menu">
        <Menu />
      </div>
      <div></div>
    </div>
  );
}

export default Navigation;
