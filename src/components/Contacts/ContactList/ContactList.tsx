import React, { FC } from 'react';
import { ContactType } from '../ContactsType';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import ListItemText from '@mui/material/ListItemText';

import './ContactList.scss';

interface ContactsProps {
  contacts: ContactType[] | undefined;
  deleteContact: (id: string) => void;
  openModal: () => void;
  getContactInfo: (id: string) => void;
}

const ContactList: FC<ContactsProps> = ({
  contacts,
  deleteContact,
  openModal,
  getContactInfo,
}) => {
  return (
    <ul className="contacts--list">
      {contacts &&
        contacts.map(({ _id, name, email, smallAvatarURL }) => (
          <ListItem key={_id} className="contacts--list__item">
            <Link to={'/contacts/' + _id} className="contacts--list__link">
              <ListItemAvatar>
                <Avatar
                  src={smallAvatarURL}
                  alt="avatar"
                  sx={{ width: 60, height: 60, marginRight: 1.5 }}
                />{' '}
              </ListItemAvatar>
              <h4 className="contacts--list__name">{name.capitalize()}</h4>{' '}
              <ListItemText className="contacts--list__email">
                {email}
              </ListItemText>{' '}
            </Link>
            <IconButton
              sx={{
                color: '#ffffff',
                marginRight: 1.5,
                '&:hover': {
                  color: 'rgb(3, 233, 244)',
                },
              }}
              onClick={() => {
                openModal();
                getContactInfo(_id);
              }}
            >
              <EditIcon />
            </IconButton>{' '}
            <IconButton
              onClick={() => deleteContact(_id)}
              sx={{
                color: '#ffffff',
                '&:hover': {
                  color: 'rgb(3, 233, 244)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>{' '}
          </ListItem>
        ))}
    </ul>
  );
};

export default React.memo(ContactList);
