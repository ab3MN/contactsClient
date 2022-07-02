import React, { FC } from 'react';
import { ContactType } from '../ContactsType';
import { Link } from 'react-router-dom';
import './ContactList.scss';

interface ContactsProps {
  contacts: Array<ContactType>;
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
      {contacts.map(({ _id, name, email, smallAvatarURL }) => (
        <li key={_id} className="contacts--list__item">
          <Link to={'/contacts/' + _id} className="contacts--list__link">
            <img
              src={smallAvatarURL}
              alt="avatar"
              className="contacts--list__img"
            />{' '}
            <h5 className="contacts--list__name">{name.capitalize()}</h5>{' '}
            <p className="contacts--list__email">{email}</p>{' '}
          </Link>
          <button
            type="button"
            onClick={() => deleteContact(_id)}
            className="contacts--list__btn"
          >
            Delete
          </button>{' '}
          <button
            type="button"
            onClick={() => {
              openModal();
              getContactInfo(_id);
            }}
            className="contacts--list__btn"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
