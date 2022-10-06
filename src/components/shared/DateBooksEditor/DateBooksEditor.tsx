import React, { FC } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MyButton from '../Buttons/MyButton/MyButton';
import './DateBooksEditor.scss';

interface IDateBooksEditor {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  type: string;
  buttonCallBack: (e: React.ChangeEvent<HTMLFormElement>) => void;
  value: string;
}

const TEXT__AREA__STYLE = {
  width: '600px',
  height: '400px',
  display: 'block',
  margin: '0 auto',
  overflow: 'auto',
  marginBottom: '40px',
  border: '3px solid rgb(3, 233, 244)',
  borderRadius: '5px',
  boxShadow:
    '0 0 5px rgb(3, 233, 244), 0 0 25px rgb(3, 233, 244),0 0 50px rgb(3, 233, 244), 0 0 100px rgb(3, 233, 244)',
  backgroundColor: 'transparent ',
  color: 'rgb(240, 248, 255)',
  fontSize: '24px',
  padding: '8px',
  lineHeight: 1.5,
  alignContent: 'center',
};

const DateBooksEditor: FC<IDateBooksEditor> = ({
  onChange,
  type = '',
  buttonCallBack,
  value,
}) => {
  return (
    <form onSubmit={buttonCallBack} className="dateBook--form">
      <TextareaAutosize
        value={value}
        onChange={onChange}
        placeholder="Type your day info"
        minRows={3}
        maxRows={Infinity}
        style={{
          ...TEXT__AREA__STYLE,
          resize: 'none',
        }}
      />
      <MyButton text={type} width="200px" style={{ fontWeight: 'bold' }} />
    </form>
  );
};

export default React.memo(DateBooksEditor);
