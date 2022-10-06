import React, { FC } from 'react';
import { validateEmail } from '../../../helpers/validateEmail';
// import { validateName } from '../../../helpers/nameValidate';
import './FormEditor.scss';
import { ContactType, IContactToEditForm } from '../../Contacts/ContactsType';
// import ErrorMessanger from '../ErrorMessanger/ErrorMessanger';
import MyButton from '../Buttons/MyButton/MyButton';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface _IEditForm {
  onEdit: (id: string, contact: IContactToEditForm) => Promise<any>;
  onAdd: (email: string, name: string, phone: string) => Promise<any>;
  id: string;
  contact?: ContactType;
  type: string;
  onClose: () => void;
}
const textFieldStyle = {
  input: {
    color: 'white',
    width: '100%',
  },
  label: {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'rgb(3, 233, 244)',
  },
  '& label.Mui-focused': {
    color: 'rgb(3, 233, 244)',
  },
};

const EditForm: FC<_IEditForm> = ({
  contact,
  onEdit,
  id,
  onClose,
  type,
  onAdd,
}) => {
  const [_contact, setContact] = React.useState<IContactToEditForm>({
    email: contact?.email || '',
    name: contact?.name || '',
    phone: contact?.phone || '',
  });
  const [message, setMessage] = React.useState<string>('');

  /*==================== SUBMIT ====================*/

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>): void =>
    setContact({ ..._contact, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!validateEmail(_contact.email)) {
      return setMessage('Wrong email validation');
    }
    // else if (!validateName(_contact.name)) {
    //   return setMessage('Allowed characters a-z');
    // }

    type === 'edit'
      ? onEdit(id, _contact)
      : onAdd(_contact.email, _contact.name, _contact.phone);
    onClose();
  };

  return (
    <section className="form__editor--box">
      <form
        onSubmit={handleSubmit}
        className="contact--editor"
        onChange={handleChange}
      >
        <Box className="contact--editor__box">
          <TextField
            id="standard-basic"
            label="Email"
            name="email"
            variant="standard"
            value={_contact.email}
            sx={textFieldStyle}
          />{' '}
        </Box>{' '}
        <Box className="contact--editor__box">
          {' '}
          <TextField
            id="standard-basic"
            label="Name"
            name="name"
            variant="standard"
            value={_contact.name}
            sx={textFieldStyle}
          />{' '}
        </Box>{' '}
        <Box className="contact--editor__box">
          <TextField
            id="standard-basic"
            label="Phone"
            name="phone"
            variant="standard"
            value={_contact.phone}
            sx={textFieldStyle}
          />{' '}
        </Box>{' '}
        <MyButton type="submit" text={type.capitalize()} height="50px" />{' '}
        <MyButton type="button" text="Close" cb={onClose} height="50px" />
      </form>
      {message && <h1>{message}</h1>}
    </section>
  );
};

export default EditForm;
