import React, { FC } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface IEditButton {
  style?: any;
  openModal?: () => void;
  getInfo?: (id: string) => void;
  id?: string;
  size?: 'large' | 'small' | 'inherit' | 'medium';
}

const EditButton: FC<IEditButton> = ({
  style,
  openModal,
  getInfo,
  id = '',
  size = 'small',
}) => {
  const _style = {
    color: 'rgb(240, 248, 255)',
    marginRight: 1.5,
    '&:hover': {
      color: 'rgb(3, 233, 244)',
    },
    ...style,
  };
  return (
    <IconButton
      sx={_style}
      onClick={() => {
        openModal && openModal();
        getInfo && getInfo(id);
      }}
    >
      <EditIcon fontSize={size} />
    </IconButton>
  );
};

export default React.memo(EditButton);
