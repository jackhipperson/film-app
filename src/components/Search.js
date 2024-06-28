import { useCallback, useEffect, useState } from "react";
import { fetchFilms } from "../util/fetch-http";
import Results from "./Results";

const Search = () => {
  // enteredSearch is a state that holds the users search term. searchResults will hold the results from the API call
  const [enteredSearch, setEnteredSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // apiError will populate on error caught from the API call or if API status is not 200
  const [apiError, setApiError] = useState(null);
  // loading state for UI on API Call wait
  const [isLoading, setIsLoading] = useState(false);

  // error text will be set based on the message passed into apiError state
  let errorText;

  // function called with every letter entered in the search bar to update enteredSearch state
  const handleSearch = (event) => {
    setEnteredSearch(event.target.value);
  };

  // function to call the API and save the results in the searchResults State. This function is set as a dependancy in useEffect and so wrapped in useCallback to avoid unncessary re-renders
  const fetchSearchResults = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    if (enteredSearch.length >= 3) {
      try {
        let apiResult = await fetchFilms(enteredSearch);
        if (apiResult.status !== 200) {
          setApiError(
            apiResult.message || "There was an error fetching the data"
          );
        } else {
          setSearchResults(apiResult.data.results);
          setApiError(null);
        }
      } catch (error) {
        setApiError(error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
    setIsLoading(false);
  }, [enteredSearch]);

  // useEffect to run api call on each render when entered search is changed
  useEffect(() => {
    fetchSearchResults();
  }, [enteredSearch, fetchSearchResults]);

  // Set error text
  if (apiError) {
    errorText = (
      <p className="text-red-800">
        Error:
        {apiError.message ||
          "There has been an error - Please contact support."}
      </p>
    );
  } else {
    errorText = null;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <div>
        <input
          onChange={handleSearch}
          value={enteredSearch}
          className="w-[90%] p-2 border rounded-lg border-yellow-600 text-3xl lg:text-xl shadow-lg"
          type="text"
          placeholder="Enter a film name..."
        />
      </div>
      <div className="h-4 p-2">
        {isLoading ? (
          <p>Loading...</p>
        ) : apiError ? (
          errorText
        ) : enteredSearch.length < 3 ? (
          <p>Enter 3 or more letters to start a search.</p>
        ) : (
          searchResults.length === 0 && !isLoading && enteredSearch.length) >= 3 && <p>No results!</p>
        }
        {searchResults.length > 0 && <Results searchResults={searchResults} />}
      </div>
    </div>
  );
};

export default Search;
