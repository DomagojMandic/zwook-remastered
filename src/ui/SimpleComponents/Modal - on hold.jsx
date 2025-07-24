import styled from "styled-components";
import { modalInAnimation } from "../Animations/modalTransition";
import { useModal } from "../../contexts/ModalFormContext";
import { cloneElement } from "react";
import { createPortal } from "react-dom";
import IconButton from "../Buttons/IconButton";
import { IoMdClose } from "react-icons/io";
import useOutsideClick from "../../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.13);
  padding: 2rem 1.5rem;
  min-width: 320px;
  width: 50vw;
  max-width: 600px;
  max-height: 90vh;
  margin: 0 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${modalInAnimation}
`;

/* A helper function for opening modals that should be used within
a context */
export function OpenModal({ children }) {
  const { handleOpen, type } = useModal();
  return cloneElement(children, {
    onClick: () => handleOpen(type),
  });
}

const Modal = ({ children }) => {
  const { closeModal, openName } = useModal();
  const ref = useOutsideClick(closeModal, true);

  if (!openName) return null;

  return createPortal(
    <Overlay>
      <ModalBox ref={ref}>
        <IconButton onClick={closeModal}>
          <IoMdClose />
        </IconButton>
        {children}
      </ModalBox>
    </Overlay>,
    document.body
  );
};

export default Modal;
