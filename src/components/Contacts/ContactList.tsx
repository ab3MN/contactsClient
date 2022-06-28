import React, { FC } from 'react';
import { ContactType } from './ContactsType';
import './ContactList.scss';

interface ContactsProps {
  contacts: Array<ContactType>;
  deleteContact: (id: string) => void;
  openModal: () => void;
}

const ContactList: FC<ContactsProps> = ({
  contacts,
  deleteContact,
  openModal,
}) => {
  return (
    <ul>
      {contacts.map(({ _id, name, email, smallAvatarURL }) => (
        <li key={_id} className='contact--list'>
          <img
            src={smallAvatarURL}
            alt='avatar'
            className='contact--list__img'
          />
          <h5 className='contact--list__name'>{name.capitalize()}</h5>{' '}
          <p className='contact--list__email'>{email}</p>
          <button
            type='button'
            onClick={() => deleteContact(_id)}
            className='contact--list__btn'>
            Delete
          </button>{' '}
          <button
            type='button'
            onClick={() => openModal()}
            className='contact--list__btn'>
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
