import { useContext } from "react";
import add from "./icons/add.svg";
import fav0 from "./icons/fav0.svg";
import fav1 from "./icons/fav1.svg";
import rem from "./icons/rem.svg";
import FilmContext from "../contexts/FilmContext";

const FilmItem = ({ film }) => {
  const filmCtx = useContext(FilmContext);
  const smallScreen = window.innerWidth <= 640;
  const maxLength = smallScreen ? 120 : 150;
  const titleLength = smallScreen ? 50 : 150;
  const longDesc = film.overview.length > maxLength;
  const longTitle = film.title.length > titleLength;
  const favButton = filmCtx.favList.includes(film.id) ? fav1 : fav0;
  const watchButton = filmCtx.watchList.includes(film.id) ? rem : add;

  const openModal = () => {
    filmCtx.setSelectedFilmHandler(film);
    filmCtx.toggleModal();
  };

  const addWatchList = (e) => {
    e.stopPropagation();
    filmCtx.addWatchList(film.id);
  };

  const addFavList = (e) => {
    e.stopPropagation();
    filmCtx.addFavList(film.id);
  };

  return (
    <li
      key={film.id}
      className="bg-white mx-auto my-4 w-[90%] border-4 border-yellow-600 rounded-md shadow-xl"
    >
      <div className="flex-row flex cursor-pointer" onClick={openModal}>
        <div className="flex-none">
          {film.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
              alt={film.title}
              height="100px"
              width="100px"
              className="overflow-hidden"
            />
          )}
        </div>

        <div className="flex-col flex-1">
          <p className="font-bold p-1 lg:p-2 text-sm lg:text-lg">{window.innerWidth}
            {film.title.slice(0, titleLength)}
            {longTitle && "..." && " "} (
            <span>{film.release_date.slice(0, 4)}</span>)
          </p>
          <p className="p-1 lg:p-2 text-xs lg:text-sm">
            {film.overview.slice(0, maxLength)}
            {longDesc && "..."}
          </p>
          <div className="flex justify-end pr-2 py-1 lg:py-2">
            <img
              src={favButton}
              alt="Favourite"
              title="Favourite"
              width="30px"
              className="mx-2"
              onClick={addFavList}
            />
            <img
              src={watchButton}
              alt="Watch List"
              title="Watch List"
              width="30px"
              className="mx-2"
              onClick={addWatchList}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default FilmItem;
