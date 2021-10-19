import React from "react";
import Avatar from "../common/Avatar/Avatar";
import Menu from "../common/Menu/Menu";
import "./Navigation.scss";

function Navigation() {
  return (
    <div className="navigation">
      <div className="container">
        <img className="logo" src="/images/logo.png" alt="imstagram logo" />
        <div className="search">
          <ion-icon name="search-outline"></ion-icon>

          <span className="searchText">search</span>
        </div>
      </div>
      <Menu />
    </div>
  );
}

export default Navigation;
