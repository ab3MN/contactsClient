import React, { FC } from 'react';
import { ContactType } from '../ContactsType';
import './ContactItem.scss';

interface IContactTypeItem {
  contact: ContactType;
  uploadImg: (file: any) => void;
}

const ContactItem: FC<IContactTypeItem> = ({ contact, uploadImg }) => {
  const [selectedImage, setSelectedImage] = React.useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files && setSelectedImage(e.target.files[0]);

  const handleUpload = (): void => selectedImage && uploadImg(selectedImage);

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
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleUpload}>
          upload
        </button>
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
