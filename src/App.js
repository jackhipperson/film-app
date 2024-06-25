import { useState } from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Modal from "./components/Modal";
import Search from "./components/Search";
import FilmProvider from "./contexts/FilmProvider";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  return (
    <FilmProvider>
      {modalOpen && <Modal toggleModal={toggleModal} />}
      <Header />
      <Search toggleModal={toggleModal} />
    </FilmProvider>
  );
}

export default App;
