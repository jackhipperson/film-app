import { useContext } from "react";
import ReactDOM from "react-dom";
import FilmContext from "../contexts/FilmContext";
import close from './icons/close.svg'
import add from './icons/add.svg'
import fav0 from './icons/fav0.svg'


const Backdrop = ({ toggleModal }) => {
  return (
    <div
      onClick={toggleModal}
      className="h-[100%] w-[100%] z-0 fixed opacity-75 bg-black"
    ></div>
  );
};

const ModalOverlay = ({toggleModal}) => {
  const filmCtx = useContext(FilmContext);
  return (
    <div className="w-[80%] max-h-[80vh] overflow-auto p-1 lg:p-2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg animate-fadeIn m-auto text-center border-4 border-yellow-700 ">
        <div onClick={toggleModal}><img src={close} alt="Close" title="Close" className="ml-auto cursor-pointer" width="25px" />
            </div>
      <p className="font-bold text-xl lg:text-3xl p-1 lg:p-2">{filmCtx.selectedFilm.title}</p>
      {filmCtx.selectedFilm.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${filmCtx.selectedFilm.poster_path}`}
          alt={filmCtx.selectedFilm.title}
          height="150px"
          width="150px"
          className="block m-auto"
        />
      )}
      <p className="text-sm lg:text-lg pt-2 lg:pt-4 pb-1 lg:pb-2"><span className="font-bold">{filmCtx.selectedFilm.release_date && "Release Date: "}</span>{filmCtx.selectedFilm.release_date}</p>
      <p className="text-sm lg:text-lg p-1 lg:p-2"><span className="font-bold">Rating: </span>{filmCtx.selectedFilm.vote_average}</p>
      <p className="text-sm lg:text-lg p-1 lg:p-2">{filmCtx.selectedFilm.overview}</p>
      <div className="flex justify-center">
            <img src={fav0} alt="Add to Favourites" title="Add to Favourites" width='30px' className="m-2 lg:m-4 cursor-pointer" />
            <img src={add} alt="Add to Wishlist" title="Add to Wishlist" width='30px' className="m-2 lg:m-4 cursor-pointer" />
          </div>
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
