import { useCallback, useEffect, useState } from "react";
import { fetchFilms } from "../util/fetch-http";
import Results from "./Results";

const Search = () => {
  // enteredSearch is a state that holds the users search term. searchResults will hold the results from the API call
  const [enteredSearch, setEnteredSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let errorText;

  console.log(searchResults);
  console.log(apiError);

  // function called with every letter entered in the search bar to update enteredSearch state
  const handleSearch = (event) => {
    setEnteredSearch(event.target.value);
  };

  // useEffect that calls the API and saves the results in the searchResults State.

  const fetchSearchResults = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    if (enteredSearch.length >= 3) {
      try {
        let apiResult = await fetchFilms(enteredSearch);
        if (apiResult.status !== 200) {
          setApiError(apiResult.message);
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
  },[enteredSearch]);

  useEffect(() => {
    fetchSearchResults(enteredSearch);
  }, [enteredSearch, fetchSearchResults]);

  if (apiError) {
    errorText = (
      <p className="text-red-800 p-2">
        Error: {apiError || "There has been an error"} - Please contact support.
      </p>
    );
  } else {
    errorText = "";
  }

  console.log(searchResults);

  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <form>
        <div className="">
          <input
            onChange={handleSearch}
            value={enteredSearch}
            className="w-[90%] p-2 border rounded-lg border-yellow-600 text-xl"
            type="text"
            placeholder="Enter a film name..."
          />
        </div>
        {/* <button>
          <div className="m-4 px-4 py-2 bg-yellow-400 border border-yellow-600 rounded-lg">
            <p className="text-xl">Search</p>
          </div>
        </button> */}
      </form>
      {isLoading && <p>Loading...</p>}
      {apiError ? (
        { errorText }
      ) : searchResults ? (
        <Results searchResults={searchResults} />
      ) : (
        <p>Enter 3 or more letters to start a search.</p>
      )}
    </div>
  );
};

export default Search;
