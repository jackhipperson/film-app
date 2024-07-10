import { Context, createContext } from "react";

export interface filmObject {
    id: number,
    title: string,
    overview: String,
    poster_path: string,
    release_date: string,
    vote_average: number,
    popularity: number
}

export interface FilmContextType {
  selectedFilm: filmObject | null,
  setSelectedFilmHandler: (film: any) => void,
  watchList: number[],
  addWatchList: (id: number) => void,
  watchFilms: any[],
  favList: number[],
  addFavList: (id: number) => void,
  favFilms: any[],
  recommendedFilms: any[],
  modalOpen: boolean,
  toggleModal: () => void,
  isLoading: boolean,
  apiError: string | null,
  setLoadingHandler: (value: boolean) => void,
  setApiErrorHandler: (error: string | null) => void,
  smallScreen: boolean
}

const FilmContext: Context<FilmContextType> = createContext<FilmContextType>({
  selectedFilm: null,
  setSelectedFilmHandler: (film) => {},
  watchList: [],
  addWatchList: (id) => {},
  watchFilms: [],
  favList: [],
  addFavList: (id) => {},
  favFilms: [],
  recommendedFilms: [],
  modalOpen: false,
  toggleModal: () => {},
  isLoading: false,
  apiError: null,
  setLoadingHandler: (value) => {},
  setApiErrorHandler: (value) => {},
  smallScreen: true
});

export default FilmContext;
