import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

interface IDeleteButton {
  style?: any;
  onDelete: (id: string) => void;
  id: string;
  size?: 'large' | 'small' | 'inherit' | 'medium';
}

const DeleteButton: FC<IDeleteButton> = ({ style, id = '', onDelete }) => {
  const _style = {
    color: 'rgb(240, 248, 255)',
    '&:hover': {
      color: 'rgb(3, 233, 244)',
    },
    ...style,
  };
  return (
    <IconButton onClick={() => onDelete(id)} sx={_style}>
      <DeleteIcon />
    </IconButton>
  );
};

export default React.memo(DeleteButton);
