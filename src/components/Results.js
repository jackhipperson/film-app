import { useContext, useEffect, useState } from "react";
import FilmItem from "./FilmItem";
import FilmContext from "../contexts/FilmContext";
import { useLocation } from "react-router-dom";

const Results = ({ searchResults, title }) => {
  const { isLoading, apiError, watchFilms, favFilms } = useContext(FilmContext);
  const location = useLocation().pathname
  const [results, setResults] = useState("")

  useEffect(() => {
    if (title === "WatchList") {
      setResults(watchFilms)
    } else if (title === "Favourites") {
      setResults(favFilms)
    } else {
      setResults(searchResults)
    }
  },[location, title, favFilms, watchFilms, searchResults])

  return (
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-center text-2xl p-2">{title}</h2>
      <div className="h-4">
      {isLoading ? <p>Loading...</p> : results.length === 0 && <p>No films found!</p>}
      </div>
      {apiError ? (
        <p className="text-red-600 ">Error: {apiError}</p>
      ) : (
        <ul>
          {results &&
            results.map((item) => {
              return <FilmItem key={item.id} film={item} />;
            })}
        </ul>
      )}
    </div>
  );
};

export default Results;
