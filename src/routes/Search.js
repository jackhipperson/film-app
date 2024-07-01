import { useCallback, useContext, useEffect, useState } from "react";
import { fetchFilms } from "../util/fetch-http";
import Results from "../components/Results";
import FilmContext from "../contexts/FilmContext";

const Search = () => {
  // enteredSearch is a state that holds the users search term. searchResults will hold the results from the API call
  const [enteredSearch, setEnteredSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setLoadingHandler, setApiErrorHandler } = useContext(FilmContext);

  // function called with every letter entered in the search bar to update enteredSearch state
  const handleSearch = (event) => {
    setEnteredSearch(event.target.value);
  };

  // function to call the API and save the results in the searchResults State. This function is set as a dependancy in useEffect and so wrapped in useCallback to avoid unncessary re-renders
  const fetchSearchResults = useCallback(async () => {
    setLoadingHandler(true);
    setApiErrorHandler(null);
    if (enteredSearch.length >= 3) {
      try {
        let apiResult = await fetchFilms(enteredSearch);
        if (apiResult.status !== 200) {
          setApiErrorHandler(
            apiResult.message || "There was an error fetching the data"
          );
        } else {
          setSearchResults(apiResult.data.results);
          setApiErrorHandler(null);
        }
      } catch (error) {
        setApiErrorHandler(error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
    setLoadingHandler(false);
  }, [enteredSearch, setApiErrorHandler, setLoadingHandler]);

  // useEffect to run api call on each render when entered search is changed
  useEffect(() => {
    fetchSearchResults();
  }, [enteredSearch, fetchSearchResults]);

  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <div>
        <input
          onChange={handleSearch}
          value={enteredSearch}
          className="w-[90%] p-2 border rounded-lg border-yellow-600 text-3xl lg:text-xl shadow-lg"
          type="text"
          placeholder="Enter a film search..."
        />
      </div>
      <div>
        <Results searchResults={searchResults.sort((a, b) => b.popularity - a.popularity)} enteredSearch={enteredSearch} />
      </div>
    </div>
  );
};

export default Search;
