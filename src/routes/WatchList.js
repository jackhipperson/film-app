import { useContext } from "react";
import Results from "../components/Results";
import FilmContext from "../contexts/FilmContext";
import Modal from "../components/Modal";

const WatchList = () => {
  const filmCtx = useContext(FilmContext);

  return (
    <>
      {filmCtx.modalOpen && <Modal />}
      <Results title="WatchList" searchResults={filmCtx.watchFilms} />
    </>
  );
};

export default WatchList;
