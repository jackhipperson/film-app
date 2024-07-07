import { useContext, useEffect, useState } from "react";
import FilmItem from "./FilmItem";
import FilmContext from "../contexts/FilmContext";
import Modal from "../components/Modal";

const Results = ({ searchResults, enteredSearch, title }) => {
  const {
    isLoading,
    apiError,
    watchFilms,
    favFilms,
    recommendedFilms,
    modalOpen,
  } = useContext(FilmContext);
  const [results, setResults] = useState([]);

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
      ? (searchHelp = "Type 3 letters to start search")
      : (searchHelp = "");

  return (
    <>
      {modalOpen && <Modal />}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-center text-2xl p-2">
          {title !== "Search" && title}
        </h2>
        <div className=" min-h-6 h-6">
          {apiError ? (
            <p className="text-red-600 ">Error: {apiError}</p>
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
            {results.map((item) => {
              return <FilmItem key={item.id} film={item} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Results;
