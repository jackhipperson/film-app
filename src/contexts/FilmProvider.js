import { useState } from 'react';
import FilmContext from './FilmContext'

const FilmProvider = ({children}) => {
  const [selectedFilm, setSelectedFilm] = useState("");

  function setSelectedFilmHandler(film) {
    console.log(film);
    setSelectedFilm(film);
  };

  const filmContext = {
    selectedFilm: selectedFilm,
    setSelectedFilmHandler: setSelectedFilmHandler
  }
  return (
    <FilmContext.Provider value={filmContext}>
      {children}
    </FilmContext.Provider>
  );
};

export default FilmProvider;
