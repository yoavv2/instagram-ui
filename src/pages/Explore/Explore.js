import React, { useEffect, useState } from "react";
import "./Explore.scss";
import { search } from "../../service/user.service";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import SearchResult from "../../Navigation/SearchResult/SearchResult";

function Explore() {
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
      // setQuery("");
    };
  }, [query]);

  useEffect(() => {
    const clickHandler = (e) => {
      setIsClicked(false);
      // setQuery("");
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div className="explore">
      <form
        className="search-wrap__mobile"
        onSubmit={() => setQuery("")}
        role="search"
      >
        <input
          className="search__mobile"
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

        <label className="search-lable__mobile">
          <span className="search-icon__mobile">
            <ion-icon name="search-outline"></ion-icon>
          </span>
          <span className="search-text__mobile">search</span>
        </label>
        {isClicked ? (
          <>
            <ScrollArea.Root>
              <div className="serach_result__border__mobile"></div>
              <ScrollArea.Viewport
                className="search_result__viewport__mobile"
                onClick={(e) => e.stopPropagation()}
              >
                {/* <div className="serach_result__border__mobile">results</div> */}
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
          </>
        ) : (
          " "
        )}
      </form>
    </div>
  );
}

export default Explore;
