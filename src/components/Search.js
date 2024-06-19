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
          setApiError(apiResult.message || "There was an error fetching the data");
          console.log(apiResult);
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
      <p className="text-red-800 p-2">
        Error: {apiError || "There has been an error"} - Please contact support.
      </p>
    );
  } else {
    errorText = null;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <div className="">
        <input
          onChange={handleSearch}
          value={enteredSearch}
          className="w-[90%] p-2 border rounded-lg border-yellow-600 text-xl"
          type="text"
          placeholder="Enter a film name..."
        />
      </div>
      <div className="h-4 p-4">{isLoading && <p>Loading...</p>}</div>
      {apiError && { errorText }}
      {searchResults ? (
        <Results searchResults={searchResults} />
      ) : (
        <p>Enter 3 or more letters to start a search.</p>
      )}
    </div>
  );
};

export default Search;
