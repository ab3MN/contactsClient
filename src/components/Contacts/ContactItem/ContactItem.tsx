import React, { FC } from 'react';
import { ContactType } from '../ContactsType';
import './ContactItem.scss';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
const { v4 } = require('uuid');

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
      <div className="contact--item upload__image--box">
        <div className="contact--item__avatar--box">
          <img
            className="contact--item__avatar"
            src={
              contact?.largeAvatarURL
                ? contact.largeAvatarURL
                : 'https://gravatar.com/avatar/6408bc7d1b20e748bb685acdb67f2355?s=250'
            }
            alt="avatar"
          />
        </div>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <label htmlFor="image_uploads" className="contact--item__upload">
            Choose images to upload
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
          <IconButton
            onClick={handleUpload}
            sx={{
              color: 'rgb(240, 248, 255)',
              '&:hover': {
                color: 'rgb(3, 233, 244)',
                backgroundColor: 'rgb(240, 248, 255)',
              },
            }}
          >
            <CloudUploadIcon />
          </IconButton>
        </Box>
      </div>
      <div className="contact--item__info">
        <h4>
          {contact &&
            contact.name
              .split(' ')
              .map(el => <span key={v4()}>{el.capitalize()}</span>)}
        </h4>
        <h5>{contact?.email}</h5>
        <p>{contact?.phone}</p>
      </div>
    </section>
  );
};

export default ContactItem;
