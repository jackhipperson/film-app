import ReactDOM from 'react-dom'

const Backdrop = () => {
  return (
    <div className="h-[100vh] w-[100vh] z-0 absolute top-1/2 left-1/2  opacity-75 bg-black"></div>
  );
};

const ModalOverlay = () => {
  return (
    <div className="w-[80%] bg-white rounded-lg ">
      <p>Hello</p>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (film) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay></ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
