import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ContactType } from '../../../components/Contacts/ContactsType';
import ContactItem from '../../../components/Contacts/ContactItem/ContactItem';

const ContactPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [contact, setContact] = React.useState<ContactType>();
  const id = location.pathname.split('/')[2];

  React.useEffect(() => {
    axios.get<ContactType>('/contacts/' + id).then(res => {
      setContact(res.data);
    });
  }, [id]);

  const handleGoBack = (): void => {
    navigate('/contacts');
  };

  const uploadImg = (file: any) => {
    const formData = new FormData();
    formData.append('avatar', file);
    file &&
      axios
        .patch<ContactType>('/contacts/' + id + '/avatar', formData, {})
        .then(res => setContact(res.data))
        .catch(e => console.log(e));
  };

  return (
    <>
      {contact && <ContactItem contact={contact} uploadImg={uploadImg} />}
      <button onClick={handleGoBack}>Back</button>
    </>
  );
};

export default ContactPage;
