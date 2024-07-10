import React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import FilmContext, { FilmContextType, filmObject } from "./FilmContext";
import { getMoviesData, getRecommendData } from "../util/fetch-http";

interface filmProviderProps {
  children: React.ReactNode;
}

const getLocalStorage = <T extends unknown>(
  key: string,
  defaultValue: T
): T => {
  const localItems = localStorage.getItem(key);
  return localItems ? JSON.parse(localItems) : defaultValue;
};

const FilmProvider: React.FC<filmProviderProps> = ({ children }) => {
  // Selected film is the focus of the modal pop up
  const [selectedFilm, setSelectedFilm] = useState<filmObject | null>(null);
  // State set up, getting local storage if available, if not, empty array
  const [watchList, setWatchList] = useState<number[]>(() =>
    getLocalStorage("userWatchList", [])
  );
  const [favList, setFavList] = useState<number[]>(() =>
    getLocalStorage("userFavList", [])
  );
  // States for Results Component
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  // set film details for results
  const [watchFilms, setWatchFilms] = useState<object[]>([]);
  const [favFilms, setFavFilms] = useState<object[]>([]);
  const [recommendedFilms, setRecommendedFilms] = useState<any[]>([]);
  // screen size state
  const [smallScreen, setSmallScreen] = useState<boolean>(
    window.innerWidth <= 640
  );

  // On film item click, add the film details to the selected film state
  const setSelectedFilmHandler = useCallback((film: filmObject) => {
    setSelectedFilm(film);
  }, []);

  // search component loading and error handling
  const setLoadingHandler = useCallback((value: boolean) => {
    setIsLoading(value);
  }, []);

  const setApiErrorHandler = useCallback((value: string) => {
    setApiError(value);
  }, []);

  // API Call to populate watch list and fav list
  const fetchLists = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const movies = await getMoviesData(watchList);
      setWatchFilms(movies);
    } catch (error: unknown) {
      setApiError(String(error));
    }
    try {
      const movies = await getMoviesData(favList);
      const recommended = await getRecommendData(favList);
      setFavFilms(movies);
      setRecommendedFilms(recommended);
    } catch (error: unknown) {
      setApiError(String(error));
    } finally {
      setIsLoading(false);
    }
  }, [watchList, favList]);

  // use effects as listeners for changes to fav list or watch list, to update local storage and run list update
  useEffect(() => {
    localStorage.setItem("userWatchList", JSON.stringify(watchList));
    fetchLists();
  }, [watchList, fetchLists]);

  useEffect(() => {
    localStorage.setItem("userFavList", JSON.stringify(favList));
    fetchLists();
  }, [favList, fetchLists]);

  const addWatchList = useCallback(
    (id: number) => {
      if (!watchList.includes(id)) {
        setWatchList((prevState) => [...prevState, id]);
      } else {
        setWatchList(watchList.filter((film) => film !== id));
      }
    },
    [watchList]
  );

  const addFavList = useCallback(
    (id: number) => {
      if (!favList.includes(id)) {
        setFavList((prevState) => [...prevState, id]);
      } else {
        setFavList(favList.filter((film) => film !== id));
      }
    },
    [favList]
  );

  // Modal State

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  }, []);

  // disable scrolling if modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto";
  }, [modalOpen]);

  // handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filmContext: FilmContextType = useMemo(
    () => ({
      selectedFilm,
      setSelectedFilmHandler,
      watchList,
      addWatchList,
      watchFilms,
      favList,
      addFavList,
      favFilms,
      recommendedFilms,
      modalOpen,
      toggleModal,
      isLoading,
      apiError,
      setLoadingHandler,
      setApiErrorHandler,
      smallScreen,
    }),
    [
      selectedFilm,
      setSelectedFilmHandler,
      watchList,
      addWatchList,
      watchFilms,
      favList,
      addFavList,
      favFilms,
      recommendedFilms,
      modalOpen,
      toggleModal,
      isLoading,
      apiError,
      setLoadingHandler,
      setApiErrorHandler,
      smallScreen,
    ]
  );

  return (
    <FilmContext.Provider value={filmContext}>{children}</FilmContext.Provider>
  );
};

export default FilmProvider;
