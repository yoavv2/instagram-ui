import React, { useState, useEffect } from "react";

import "./Navigation.scss";
import Menu from "../common/Menu/Menu";

import { search } from "../service/user.service";
import SearchResult from "./SearchResult/SearchResult";
import { ReactComponent as Insta } from "../images/insta-logo-small.svg";

function Navigation() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!query.trim().length) {
      setResults([]);
      return;
    }
    let timeout = setTimeout(async () => {
      await search(query).then((results) => setResults(results));
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [query]);
  useEffect(() => {
    const clickHandler = (e) => {
      setIsClicked(false);
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);
  return (
    <div className="navigation">
      <div className="nav_container">
        <div className="logo_wrap">
          <img
            className="insta-logo"
            src="/images/insta-logo.png"
            alt="instagram logo"
          />
          <Insta className="insta-logo-small" />
        </div>

        <form className="search-wrap" role="search">
          <input
            className="search"
            type="text"
            onClick={(e) => {
              e.stopPropagation();
              if (!isClicked) setIsClicked(true);
            }}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <label className="search-lable">
            <span className="search-icon">
              <ion-icon name="search-outline"></ion-icon>
            </span>
            <span className="search-text">search</span>
          </label>
          {isClicked ? (
            <>
              <div className="search_result__square"></div>
              <div
                className="search_result__background "
                onClick={(e) => e.stopPropagation()}
              >
                {results.map((result) => (
                  <SearchResult
                    onClose={() => setIsClicked(false)}
                    className="search_result"
                    user={result}
                    key={result._id}
                  />
                ))}
              </div>
            </>
          ) : (
            " "
          )}
        </form>

        <div className="nav-menu">
          <Menu />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Navigation;
