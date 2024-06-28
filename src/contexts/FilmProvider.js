import { useEffect, useState, useCallback } from "react";
import FilmContext from "./FilmContext";
import { getMoviesData } from "../util/fetch-http";

const FilmProvider = ({ children }) => {
  // Selected film is the focus of the modal pop up
  const [selectedFilm, setSelectedFilm] = useState("");
  // State set up, getting local storage if available, if not, empty array
  const [watchList, setWatchList] = useState(() => {
    const localItems = localStorage.getItem("userWatchList");
    return localItems ? JSON.parse(localItems) : [];
  });
  const [favList, setFavList] = useState(() => {
    const localItems = localStorage.getItem("userFavList");
    return localItems ? JSON.parse(localItems) : [];
  });
  // States for Results Component
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  // set film details for results
  const [watchFilms, setWatchFilms] = useState([])
  const [favFilms, setFavFilms] = useState([])

  // On film item click, add the film details to the selected film state
  function setSelectedFilmHandler(film) {
    setSelectedFilm(film);
  }

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
      setFavFilms(movies);
    } catch (error) {
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
  }, [watchList,favList]);

    // use effects as listeners for changes to fav list or watch list, to update local storage and run list update
    useEffect(() => {
      localStorage.setItem('userWatchList', JSON.stringify(watchList))
      fetchLists()
    },[watchList, fetchLists])
  
    useEffect(() => {
      localStorage.setItem('userFavList', JSON.stringify(favList))
      fetchLists()
    },[favList, fetchLists])

  function addWatchList(id) {
    if (!watchList.includes(id)) {
      setWatchList((prevState) => [...prevState, id]);
    } else {
      setWatchList(watchList.filter((film) => film !== id));
    }
  }

  function addFavList(id) {
    if (!favList.includes(id)) {
      setFavList((prevState) => [...prevState, id]);
    } else {
      setFavList(favList.filter((film) => film !== id));
    }
  }

  // Modal State

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  if (modalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const filmContext = {
    selectedFilm,
    setSelectedFilmHandler,
    watchList,
    addWatchList,
    watchFilms,
    favList,
    addFavList,
    favFilms,
    modalOpen,
    toggleModal,
    isLoading,
    apiError
  };
  return (
    <FilmContext.Provider value={filmContext}>{children}</FilmContext.Provider>
  );
};

export default FilmProvider;
