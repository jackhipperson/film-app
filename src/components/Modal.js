import ReactDOM from "react-dom";

const Backdrop = ({toggleModal}) => {
  return (
    <div onClick={toggleModal} className="h-[100vh] w-[100%] z-0 absolute opacity-75 bg-black"></div>
  );
};

const ModalOverlay = () => {
  return (
    <div className="w-[80%] p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg animate-fadeIn ">
      <p>Hello</p>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = ({toggleModal}) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop toggleModal={toggleModal} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay></ModalOverlay>, portalElement)}
    </>
  );
};

export default Modal;
