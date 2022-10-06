import React, { FC } from 'react';
import './MyButton.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width?: string;
  height?: string;
  cb?: () => any;
  style?: any;
}

const MyButton: FC<IButton> = ({
  text,
  width = '',
  height = '',
  type,
  cb,
  style,
}) => {
  return (
    <button
      onClick={() => cb && cb()}
      type={type}
      className="shared__button"
      style={{ width, height, ...style }}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </button>
  );
};

export default MyButton;
