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
  recommendedFilms: [],
  modalOpen: "",
  setModalOpen: () => {},
  isLoading: "",
  apiError: "",
  setLoadingHandler: (value) => {},
  setApiErrorHandler: (value) => {},
});

export default FilmContext;
