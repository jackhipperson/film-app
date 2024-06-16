import { useState } from "react";
import { fetchFilms } from "../util/fetch-http";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (search.length > 3) {
      let filmResults = fetchFilms(search);
      console.log(filmResults);
    }
  };
  return (
    <div className="max-w-6xl mx-auto my-10 text-center">
      <form>
        <div className="">
          <input
            onChange={handleSearch}
            value={search}
            className="w-[90%] p-2 border rounded-lg border-yellow-600 text-xl"
            type="text"
            placeholder="Enter a film name..."
          />
        </div>
        <button>
          <div className="m-4 px-4 py-2 bg-yellow-400 border border-yellow-600 rounded-lg">
            <p className="text-xl">Search</p>
          </div>
        </button>
      </form>
    </div>
  );
};

export default Search;
