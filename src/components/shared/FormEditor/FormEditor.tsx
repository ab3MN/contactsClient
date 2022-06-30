import React, { FC } from 'react';
import { validateEmail } from '../../../helpers/validateEmail';
import { validateName } from '../../../helpers/nameValidate';
import './FormEditor.scss';

interface IEditForm {
  email: string | undefined;
  name: string | undefined;
  phone: string | undefined;
}
interface _IEditForm extends IEditForm {
  onEdit: (
    email: string | undefined,
    name: string | undefined,
    phone: string | undefined,

    id: string | undefined,
  ) => Promise<any>;
  onAdd: (email: string | undefined, name: string | undefined) => Promise<any>;

  id: string | undefined;
  type: string;

  onClose: () => void;
}

const EditForm: FC<_IEditForm> = ({
  email,
  name,
  phone,
  onEdit,
  id,
  onClose,
  type,
  onAdd,
}) => {
  const [_contact, setContact] = React.useState<IEditForm>({
    email: email || '',
    name: name || '',
    phone: phone || '',
  });
  const [message, setMessage] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setContact({ ..._contact, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, name, phone } = _contact;

    if (!validateEmail(email)) {
      return setMessage('Wrong email validation');
    } else if (!validateName(name)) {
      return setMessage('Allowed characters a-z');
    }

    type === 'edit' ? onEdit(id, email, name, phone) : onAdd(email, name);
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
