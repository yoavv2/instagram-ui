import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ScrollArea from "@radix-ui/react-scroll-area";
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
    //? debounce

    let timeout = setTimeout(async () => {
      await search(query).then((results) => setResults(results));
    }, 1000);
    return () => {
      clearTimeout(timeout);
      setQuery("");
    };
  }, [query]);

  useEffect(() => {
    const clickHandler = (e) => {
      setIsClicked(false);
      setQuery("");
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="navigation">
      <div className="nav_container">
        <Link to={"/"} className="logo_wrap">
          <img
            className="insta-logo"
            src="/images/insta-logo.png"
            alt="instagram logo"
          />
          <Insta className="insta-logo-small" />
        </Link>

        <form
          onSubmit={() => setQuery("")}
          className="search-wrap"
          role="search"
        >
          <input
            className="search"
            type="text"
            onClick={(e) => {
              e.stopPropagation();

              if (!isClicked) {
                setIsClicked(true);
              }
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
              <ScrollArea.Root>
                <div className="serach_result__border"></div>
                <ScrollArea.Viewport
                  className="search_result__background "
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="serach_result__border">results</div>
                  {results.map((result) => (
                    <SearchResult
                      onClose={() => setIsClicked(false)}
                      className="search_result"
                      user={result}
                      key={result._id}
                    />
                  ))}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical">
                  <ScrollArea.Thumb className="scrolbar_tumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar orientation="horizontal">
                  <ScrollArea.Thumb className="scrolbar_tumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
              </ScrollArea.Root>

              {/* <div
                className="search_result__background "
                onClick={(e) => e.stopPropagation()}
              >
                <div className="serach_result__border"></div>
              </div> */}
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
