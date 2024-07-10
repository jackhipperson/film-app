import React, { MouseEvent, useContext } from "react";
import addIcon from "./icons/add.svg";
import favAddIcon from "./icons/fav0.svg";
import favRemIcon from "./icons/fav1.svg";
import remIcon from "./icons/rem.svg";
import FilmContext, { filmObject } from "../contexts/FilmContext";

interface filmItemProps {
  film: filmObject
}

const FilmItem: React.FC<filmItemProps> = ({film}) => {
  // Get film context
  const filmCtx = useContext(FilmContext);
  // Set length of title and description and then set indicators if max length is hit
  const maxLength = filmCtx.smallScreen ? 120 : 150;
  const titleLength = filmCtx.smallScreen ? 50 : 150;
  const longDesc = film.overview.length > maxLength;
  const longTitle = film.title.length > titleLength;
  // Set which icon is used depending on whether film item is in a list
  const favButton = filmCtx.favList.includes(film.id) ? favRemIcon : favAddIcon;
  const watchButton = filmCtx.watchList.includes(film.id) ? remIcon : addIcon;

  // Function to call modal opening handler in context
  const openModal = () => {
    filmCtx.setSelectedFilmHandler(film);
    filmCtx.toggleModal();
  };

  // Function to call add to watchlist in context. stopPropagation used to stop modal opening on click instead of this function
  const addWatchList = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    filmCtx.addWatchList(film.id);
  };

  // Function to call add to favourites in context. stopPropagation used to stop modal opening on click instead of this function
  const addFavList = (e: MouseEvent<HTMLImageElement>) => {
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
          <p className="font-bold p-1 lg:p-2 text-sm lg:text-lg">
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
