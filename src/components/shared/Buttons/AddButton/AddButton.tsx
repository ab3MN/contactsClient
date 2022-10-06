import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface IAddButton {
  openModal?: () => void;
  changeType?: (type: string) => void;
  size?: 'large' | 'small' | 'inherit' | 'medium' | undefined;
  style?: {};
  type?: string;
}

const AddButton: FC<IAddButton> = ({
  openModal,
  changeType,
  size = 'large',
  style = {},
  type = '',
}) => {
  const _style = {
    color: 'rgb(240, 248, 255)',
    display: 'block',
    '&:hover': {
      color: 'rgb(3, 233, 244)',
    },
    ...style,
  };
  return (
    <IconButton
      onClick={() => {
        openModal && openModal();
        changeType && changeType(type);
      }}
      sx={_style}
    >
      <AddCircleOutlineIcon fontSize={size} />
    </IconButton>
  );
};

export default React.memo(AddButton);
