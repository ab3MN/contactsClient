import React, { FC } from 'react';
import { ContactType } from '../ContactsType';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import ListItemText from '@mui/material/ListItemText';

import './ContactList.scss';
import EditButton from '../../shared/Buttons/EditButton/EditButton';
import DeleteButton from '../../shared/Buttons/DeleteButton/DeleteButton';

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
            <EditButton
              openModal={openModal}
              getInfo={getContactInfo}
              id={_id}
            />
            <DeleteButton onDelete={deleteContact} id={_id} />
          </ListItem>
        ))}
    </ul>
  );
};

export default React.memo(ContactList);
