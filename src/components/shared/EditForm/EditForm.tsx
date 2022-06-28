import React, { FC } from 'react';
import { validateEmail } from '../../../helpers/validateEmail';
import { validateName } from '../../../helpers/nameValidate';

interface EditForm {
  email: string;
  name: string;
}
interface IEditForm extends EditForm {
  onEdit: (email: string, name: string) => void;
}

const EditForm: FC<IEditForm> = ({ email, name, onEdit }) => {
  const [_contact, setContact] = React.useState<EditForm>({
    email: '',
    name: '',
  });
  const [message, setMessage] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setContact({ ..._contact, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, name } = _contact;
    if (!validateEmail(email)) {
      return setMessage('Wrong email validation');
    } else if (!validateName(name)) {
      return setMessage('Allowed characters a-z');
    }
    onEdit(email, name);

    setContact({ email: '', name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>
        Email :
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={handleChange}
        />
      </label>{' '}
      <label htmlFor='name'>
        Email :
        <input
          type='name'
          name='name'
          id='name'
          value={name}
          onChange={handleChange}
        />
      </label>
      <button>Edit</button>
    </form>
  );
};

export default EditForm;
