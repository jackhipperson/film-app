import { useEffect, useState, useCallback, useMemo } from "react";
import FilmContext from "./FilmContext";
import { getMoviesData, getRecommendData } from "../util/fetch-http";

const getLocalStorage = (key, defaultValue) => {
  const localItems = localStorage.getItem(key)
  return localItems ? JSON.parse(localItems) : defaultValue 
}

const FilmProvider = ({ children }) => {
  // Selected film is the focus of the modal pop up
  const [selectedFilm, setSelectedFilm] = useState(null);
  // State set up, getting local storage if available, if not, empty array
  const [watchList, setWatchList] = useState(() => getLocalStorage("userWatchList",[]));
  const [favList, setFavList] = useState(() => getLocalStorage("userFavList", []))
  // States for Results Component
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  // set film details for results
  const [watchFilms, setWatchFilms] = useState([]);
  const [favFilms, setFavFilms] = useState([]);
  const [recommendedFilms, setRecommendedFilms] = useState([]);
  // screen size state
  const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 640);

  // On film item click, add the film details to the selected film state
  const setSelectedFilmHandler = useCallback((film) => {
    setSelectedFilm(film);
  },[]);

  // search component loading and error handling
  const setLoadingHandler = useCallback((value) => {
    setIsLoading(value);
  }, []);

  const setApiErrorHandler = useCallback((value) => {
    setApiError(value);
  }, []);

  // API Call to populate watch list and fav list
  const fetchLists = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const movies = await getMoviesData(watchList);
      setWatchFilms(movies);
    } catch (error) {
      setApiError(error);
    }
    try {
      const movies = await getMoviesData(favList);
      const recommended = await getRecommendData(favList);
      setFavFilms(movies);
      setRecommendedFilms(recommended);
    } catch (error) {
      setApiError(error);
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

  const addWatchList = useCallback((id) => {
    if (!watchList.includes(id)) {
      setWatchList((prevState) => [...prevState, id]);
    } else {
      setWatchList(watchList.filter((film) => film !== id));
    }
  },[watchList]);

  const addFavList = useCallback((id) => {
    if (!favList.includes(id)) {
      setFavList((prevState) => [...prevState, id]);
    } else {
      setFavList(favList.filter((film) => film !== id));
    }
  },[favList])

  // Modal State

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setModalOpen((prevState) => !prevState);
  },[]);

  // disable scrolling if modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "auto"
  }, [modalOpen])

  // handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth <= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filmContext = useMemo(
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
