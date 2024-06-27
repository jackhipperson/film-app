import { createContext } from "react";

const FilmContext = createContext({
  selectedFilm: "",
  watchList: [],
  addWatchList: (id) => {},
  favList: [],
  addFavList: (id) => {},
  setSelectedFilmItem: (film) => {},
});

export default FilmContext;
