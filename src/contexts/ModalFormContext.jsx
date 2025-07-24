import { useContext, createContext } from "react";
import { useState } from "react";

const ModalContext = createContext();

function ModalProvider({ children, type }) {
  const [openName, setOpenName] = useState(null);

  const handleOpen = setOpenName;
  const closeModal = () => setOpenName(null);

  return (
    <ModalContext.Provider value={{ openName, handleOpen, closeModal, type }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export default ModalProvider;
