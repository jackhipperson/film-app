import { useContext } from "react";
import ReactDOM from "react-dom";
import FilmContext from "../contexts/FilmContext";
import close from './icons/close.svg'

const Backdrop = ({ toggleModal }) => {
  return (
    <div
      onClick={toggleModal}
      className="h-[100vh] w-[100%] z-0 absolute opacity-75 bg-black"
    ></div>
  );
};

const ModalOverlay = ({toggleModal}) => {
  const filmCtx = useContext(FilmContext);
  return (
    <div className="w-[80%] p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg animate-fadeIn m-auto text-center">
        <div onClick={toggleModal}><img src={close} className="ml-auto" width="25px" />
            </div>
      <p>ID: {filmCtx.selectedFilm.id}</p>
      <p>{filmCtx.selectedFilm.title}</p>
      {filmCtx.selectedFilm.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${filmCtx.selectedFilm.poster_path}`}
          alt={filmCtx.selectedFilm.title}
          height="200px"
          width="200px"
          className="block m-auto"
        />
      )}
      <p>Release Date: {filmCtx.selectedFilm.release_date}</p>
      <p>Rating: {filmCtx.selectedFilm.vote_average}</p>
      <p>{filmCtx.selectedFilm.overview}</p>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({ toggleModal }) => {
  const { selectedFilm } = useContext(FilmContext);

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop toggleModal={toggleModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay selectedFilm={selectedFilm} toggleModal={toggleModal} />,
        portalElement
      )}
    </>
  );
};

export default Modal;
