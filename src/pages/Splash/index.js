import React from "react";
import { Dashboard, SignIn, SignUp } from "../../components";

import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export default function Splash() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    // will check whether they already have an account, if they do they will be sent to the Dashboard, if they don't the modal will appear.
    <section>
      <button
        onClick={openModal}
        className="btn btn-dark btn-lg position-absolute top-50 start-50"
      >
        Enter
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <SignUp />


<button onClick={closeModal}>close</button>


        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>

        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>
    </section>
  );
}
