import { useEffect, useState } from "react";
import { fetchFilms } from "../util/fetch-http";
import Results from "./Results";

const Search = () => {
  // enteredSearch is a state that holds the users search term. searchResults will hold the results from the API call
  const [enteredSearch, setEnteredSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // function called with every letter entered in the search bar to update enteredSearch state
  const handleSearch = async (event) => {
    setEnteredSearch(event.target.value);
  };

  // useEffect that calls the API once search characters is equal to or more than 3 and saves the results in the searchResults State. If less than 3 chars, or user has deleted chars, the results clear
  useEffect(() => {
    if (enteredSearch.length >= 3) {
      async function fetchSearchResults() {
        let apiResult = await fetchFilms(enteredSearch);
        setSearchResults(apiResult);
      }
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [enteredSearch]);

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
      <Results searchResults={searchResults} />
    </div>
  );
};

export default Search;
