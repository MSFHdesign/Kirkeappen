import React, { useState } from "react";

interface Props {
  buttonContent: React.ReactNode;
  closeButtonContent: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  buttonContent,
  closeButtonContent,
  onClose,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleEscapeKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  return (
    <>
      <button onClick={handleOpen}>{buttonContent}</button>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            {children}
            <button onClick={handleClose}>{closeButtonContent}</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
