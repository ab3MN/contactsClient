import React, { FC } from 'react';
import './Button.scss';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  width?: string;
  height?: string;
  cb?: () => any;
}

const Button: FC<IButton> = ({
  text,
  width = '100%',
  height = '100%',
  type,
  cb,
}) => {
  return (
    <button onClick={() => cb && cb()} type={type} className="shared__button ">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </button>
  );
};

export default Button;
