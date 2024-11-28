import { useState } from "react";
import Modal from "./Components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenBackground, setModalOpenBackground] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    setModalOpenBackground(true);
  };

  return (
    <div className="modalBackground">
      <h1 >User Details Modal</h1>
      <button onClick={handleClick} className="modalTrigger">
        Open Form
      </button>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setModalOpenBackground={setModalOpenBackground}
        />
      )}
    </div>
  );
}

export default App;
