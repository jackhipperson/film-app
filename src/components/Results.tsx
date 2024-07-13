import React, { useContext, useEffect, useState } from "react";
import FilmItem from "./FilmItem";
import FilmContext, { filmObject } from "../contexts/FilmContext";
import Modal from "./ui/Modal";

interface resultsProps {
  searchResults: filmObject[];
  enteredSearch: string;
  title: string;
}

const Results: React.FC<resultsProps> = ({
  searchResults,
  enteredSearch,
  title,
}) => {
  const {
    isLoading,
    apiError,
    watchFilms,
    favFilms,
    recommendedFilms,
    modalOpen,
  } = useContext(FilmContext);
  const [results, setResults] = useState<filmObject[]>([]);

  let searchHelp;

  useEffect(() => {
    if (title === "WatchList") {
      setResults(watchFilms);
    } else if (title === "Favourites") {
      setResults(favFilms);
    } else if (title === "Recommended") {
      setResults(recommendedFilms);
    } else {
      setResults(searchResults);
    }
  }, [title, favFilms, watchFilms, recommendedFilms, searchResults]);

  searchHelp =
    title === "Search" && enteredSearch.length < 3
      ? "Type 3 letters to start search"
      : "";

  return (
    <>
      {modalOpen && <Modal />}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-center text-2xl p-2">
          {title !== "Search" && title}
        </h2>
        <div className=" min-h-6 h-6">
          {apiError ? (
            <p className="text-red-600 ">{apiError}</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : enteredSearch.length >= 3 && results.length === 0 ? (
            <p>No results!</p>
          ) : (
            <p>{searchHelp}</p>
          )}
        </div>
        <div>
          <ul>
            {!apiError && results.map((item: filmObject) => {
              return <FilmItem key={item.id} film={item} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Results;
