import React, { useContext } from "react";
import ReactDOM from "react-dom";
import FilmContext, { filmObject } from "../../contexts/FilmContext";
import closeIcon from "../icons/close.svg";
import addWatchIcon from "../icons/add.svg";
import addFavIcon from "../icons/fav0.svg";
import remFavIcon from "../icons/fav1.svg";
import remWatchIcon from "../icons/rem.svg";

// Backdrop of the modal, grey background that closes the modal on click
const Backdrop: React.FC = () => {
  const { toggleModal } = useContext(FilmContext);
  return (
    <div
      onClick={toggleModal}
      className="h-[100%] w-[100%] z-50 fixed opacity-75 bg-black"
    ></div>
  );
};

// Modal overlay with film details
const ModalOverlay: React.FC = () => {
  const {
    favList,
    watchList,
    selectedFilm,
    toggleModal,
    addWatchList,
    addFavList,
    setApiErrorHandler,
    setLoadingHandler,
  } = useContext(FilmContext);
  
  if (!selectedFilm) {
    return null
  }

  const favButton = favList.includes(selectedFilm.id) ? remFavIcon : addFavIcon;
  const watchButton = watchList.includes(selectedFilm.id)
    ? remWatchIcon
    : addWatchIcon;

  // Handler for adding or removing a film to the watchlist
  const addWatchListHandler = () => {
    setLoadingHandler(true);
    try {
      addWatchList(selectedFilm.id);
    } catch (err) {
      setApiErrorHandler("Failed to update WatchList, please try again later.");
    }
    setLoadingHandler(false);
  };

  // Handler for adding or removing a film to favourites
  const addFavListHandler = () => {
    setLoadingHandler(true);
    try {
      addFavList(selectedFilm.id);
    } catch (err) {
      setApiErrorHandler("Failed to update WatchList, please try again later.");
    }
    setLoadingHandler(false);
  };

  return (
    <div className="w-[80%] max-h-[80vh] z-50 overflow-auto p-1 lg:p-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg animate-fadeIn m-auto text-center border-4 border-yellow-700 ">
      <div onClick={toggleModal}>
        <img
          src={closeIcon}
          alt="Close"
          title="Close"
          className="ml-auto cursor-pointer"
          width="25px"
        />
      </div>
      <p className="font-bold text-xl lg:text-3xl p-1 lg:p-2">
        {selectedFilm.title}
      </p>
      {selectedFilm.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${selectedFilm.poster_path}`}
          alt={selectedFilm.title}
          height="150px"
          width="150px"
          className="block m-auto"
        />
      )}
      <p className="text-sm lg:text-lg pt-2 lg:pt-4 pb-1 lg:pb-2">
        <span className="font-bold">
          {selectedFilm.release_date && "Release Date: "}
        </span>
        {selectedFilm.release_date}
      </p>
      <p className="text-sm lg:text-lg p-1 lg:p-2">
        <span className="font-bold">Rating: </span>
        {selectedFilm.vote_average}
      </p>
      <p className="text-sm lg:text-lg p-1 lg:p-2">{selectedFilm.overview}</p>
      <div className="flex justify-center">
        <img
          src={favButton}
          alt="Favourites"
          title="Favourites"
          width="30px"
          className="m-2 lg:m-4 cursor-pointer"
          onClick={addFavListHandler}
        />
        <img
          src={watchButton}
          alt="Watchlist"
          title="Watchlist"
          width="30px"
          className="m-2 lg:m-4 cursor-pointer"
          onClick={addWatchListHandler}
        />
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

// Main modal component that renders the modal backdrop and component using portal so appears on top of App screen
const Modal: React.FC = () => {
  if (!portalElement) {
    return null
  }
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay/>,
        portalElement
      )}
    </>
  );
};

export default Modal;
