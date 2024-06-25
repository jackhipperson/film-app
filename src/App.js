import { useState } from "react";
import Header from "./components/Header";
import LogIn from "./components/LogIn";
import Modal from "./components/Modal";
import Search from "./components/Search";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  return (
    <>
      {modalOpen && <Modal toggleModal={toggleModal} />}
      <Header />
      <Search toggleModal={toggleModal} />
    </>
  );
}

export default App;
