import React, { FC } from 'react';

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ children, onClose }) => {
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) =>
      e.code !== 'Escape' ? undefined : onClose();

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  return <div>{children}</div>;
};

export default Modal;
