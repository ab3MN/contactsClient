import React, { FC } from 'react';
import { ContactType } from './ContactsType';
import './ContactItem.scss';

interface IContactTypeItem {
  contact: ContactType | undefined;
}

const ContactItem: FC<IContactTypeItem> = ({ contact }) => {
  return (
    <section className="contact--item">
      <div>
        <img src={contact?.largeAvatarURL} alt="avatar" />
        <label htmlFor="image_uploads" className="contact--item__upload">
          Choose images to upload (PNG, JPG){' '}
          <input
            className="contact--item__input"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
            multiple
          />
        </label>
      </div>
      <div>
        <h4>{contact?.name}</h4>
        <h5>{contact?.email}</h5>
        <p>{contact?.phone}</p>
      </div>
    </section>
  );
};

export default ContactItem;
