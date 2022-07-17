import React, { FC } from 'react';
import { validateEmail } from '../../../helpers/validateEmail';
import { validateName } from '../../../helpers/nameValidate';
import './FormEditor.scss';
import { ContactType, IContactToEditForm } from '../../Contacts/ContactsType';
import ErrorMessanger from '../ErrorMessanger/ErrorMessanger';
import Button from '../Button/Button';

interface _IEditForm {
  onEdit: (id: string, contact: IContactToEditForm) => Promise<any>;
  onAdd: (email: string, name: string) => Promise<any>;

  id: string;
  contact?: ContactType;
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
  const [_contact, setContact] = React.useState<IContactToEditForm>({
    email: contact?.email || '',
    name: contact?.name || '',
    phone: contact?.phone || '',
  });
  const [message, setMessage] = React.useState<string>('');
  // type === 'add' && setContact({ email: '', name: '', phone: '' });

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
      ? onEdit(id, _contact)
      : onAdd(_contact.email, _contact.name);
    onClose();
    setContact({ email: '', name: '', phone: '' });
  };

  return (
    <section className="form__editor--box">
      <form onSubmit={handleSubmit} className="contact--editor">
        <div className="contact--editor__box">
          <input
            type="email"
            name="email"
            id="email"
            value={_contact.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>{' '}
        </div>
        <div className="contact--editor__box">
          <input
            type="name"
            name="name"
            id="name"
            value={_contact.name}
            onChange={handleChange}
          />
          <label htmlFor="name">Name</label>{' '}
        </div>
        <div className="contact--editor__box">
          <input
            type="phone"
            name="phone"
            id="phone"
            value={_contact.phone}
            onChange={handleChange}
          />
          <label htmlFor="phone">Phone</label>
        </div>
        <Button type="submit" text={type.capitalize()} height="30px" />{' '}
        <Button type="submit" text="Close" cb={onClose} height="30px" />
      </form>
      {message && <h1>{message}</h1>}
    </section>
  );
};

export default EditForm;
