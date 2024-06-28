import { createContext } from "react";

const FilmContext = createContext({
  selectedFilm: "",
  setSelectedFilmItem: (film) => {},
  watchList: [],
  addWatchList: (id) => {},
  watchFilms: [],
  fetchWatchList: () => {},
  favList: [],
  addFavList: (id) => {},
  favFilms: [],
  modalOpen: "",
  setModalOpen: () => {},
  isLoading: "",
  apiError: ""
});

export default FilmContext;
