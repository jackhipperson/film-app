import { useContext } from "react";
import Modal from "../components/Modal";
import Search from "../components/Search";
import FilmContext from "../contexts/FilmContext";

function App() {
const filmCtx = useContext(FilmContext)

  return (
    <>
      {filmCtx.modalOpen && <Modal />}
      <Search />
    </>
  );
}

export default App;
