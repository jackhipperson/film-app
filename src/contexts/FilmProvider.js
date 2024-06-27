import { useState } from "react";
import FilmContext from "./FilmContext";

const FilmProvider = ({ children }) => {
  const [selectedFilm, setSelectedFilm] = useState("");
  const [watchList, setWatchList] = useState([]);
  const [favList, setFavList] = useState([]);

  function setSelectedFilmHandler(film) {
    setSelectedFilm(film);
  }

  function addWatchList(id) {
    if (!watchList.includes(id)) {
        setWatchList((prevState) => [...prevState, id])
    } else {
        setWatchList(watchList.filter(film => film !== id))
    }
  }

  function addFavList(id) {
    if (!favList.includes(id)) {
        setFavList((prevState) => [...prevState, id])
    } else {
        setFavList(favList.filter(film => film !== id))
    }
  }



  const filmContext = {
    selectedFilm: selectedFilm,
    watchList: watchList,
    addWatchList:addWatchList,
    favList: favList,
    addFavList:addFavList,
    setSelectedFilmHandler: setSelectedFilmHandler,
  };
  return (
    <FilmContext.Provider value={filmContext}>{children}</FilmContext.Provider>
  );
};

export default FilmProvider;
