import { useState } from "react";
import Modal from "../components/Modal";
import Search from "../components/Search";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((prevState) => !prevState);
  };

  if (modalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <>
      {modalOpen && <Modal toggleModal={toggleModal} />}
      <Search toggleModal={toggleModal} />
    </>
  );
}

export default App;
