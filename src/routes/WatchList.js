import { useCallback, useContext, useEffect, useState } from "react";
import Results from "../components/Results";
import FilmContext from "../contexts/FilmContext";
import { getMoviesData } from "../util/fetch-http";

const WatchList = () => {
  const [watchFilms, setWatchFilms] = useState([]);
  // apiError will populate on error caught from the API call or if API status is not 200
  const [apiError, setApiError] = useState(null);
  // loading state for UI on API Call wait
  const [isLoading, setIsLoading] = useState(false);
  const filmCtx = useContext(FilmContext);
  let ids = filmCtx.watchList;

  const fetchWatchList = useCallback(() => {
    setIsLoading(true);
    setApiError(null);
    getMoviesData(ids)
      .then((movies) => {
        setWatchFilms(movies);
      })
      .catch((error) => {
        setApiError(error);
      }).then(setIsLoading(false))
  },[ids]);

  useEffect(() => {
    fetchWatchList();
  }, [fetchWatchList, ids]);

  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <h2 className="text-center text-2xl p-2">WatchList</h2>
      {isLoading && <p>Loading...</p>}
      {apiError ? (
        <p className="text-red-600 ">Error: {apiError}</p>
      ) : (
        <Results searchResults={watchFilms} />
      )}
      {ids && <p>No films found!</p>}
    </div>
  );
};

export default WatchList;
