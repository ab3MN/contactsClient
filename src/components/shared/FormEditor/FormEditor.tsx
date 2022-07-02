import React, { FC } from 'react';
import { validateEmail } from '../../../helpers/validateEmail';
import { validateName } from '../../../helpers/nameValidate';
import './FormEditor.scss';
import { ContactType } from '../../Contacts/ContactsType';
import ErrorMessanger from '../ErrorMessanger/ErrorMessanger';

interface IEditForm {
  email: string;
  name: string;
  phone: string;
}

interface _IEditForm extends IEditForm {
  onEdit: (id: string, contact: ContactType) => Promise<any>;
  onAdd: (email: string, name: string) => Promise<any>;

  id: string;
  contact: ContactType;
  type: string;

  onClose: () => void;
}

const EditForm: FC<_IEditForm> = ({
  contact,
  onEdit,
  id,
  onClose,
  type,
  onAdd,
}) => {
  const [_contact, setContact] = React.useState<IEditForm>({
    email: contact.email || '',
    name: contact.name || '',
    phone: contact.phone || '',
  });
  const [message, setMessage] = React.useState<string>('');

  /*==================== SUBMIT ====================*/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setContact({ ..._contact, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!validateEmail(_contact.email)) {
      return setMessage('Wrong email validation');
    } else if (!validateName(_contact.name)) {
      return setMessage('Allowed characters a-z');
    }

    type === 'edit'
      ? onEdit(id, contact)
      : onAdd(_contact.email, _contact.name);
    setContact({ email: '', name: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="contact--editor">
      <label htmlFor="email" className="contact--editor__label">
        Email :
        <input
          type="email"
          name="email"
          id="email"
          value={_contact.email}
          onChange={handleChange}
          className="contact--editor__input"
        />
      </label>{' '}
      <label htmlFor="name" className="contact--editor__label">
        Name :
        <input
          type="name"
          name="name"
          id="name"
          value={_contact.name}
          onChange={handleChange}
          className="contact--editor__input"
        />
      </label>{' '}
      <label htmlFor="phone" className="contact--editor__label">
        Phone :
        <input
          type="phone"
          name="phone"
          id="phone"
          value={_contact.phone}
          onChange={handleChange}
          className="contact--editor__input"
        />
      </label>
      <button type="submit" className="contact--editor__btn">
        {type.capitalize()}{' '}
      </button>{' '}
      <button type="submit" className="contact--editor__btn" onClick={onClose}>
        Close
      </button>
    </form>
  );
};

export default EditForm;
