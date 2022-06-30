import React from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { ContactType } from '../../components/Contacts/ContactsType';
import ContactItem from '../../components/Contacts/ContactItem';

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
  console.log(contact);

  const handleGoBack = (): void => {
    navigate('/contacts');
  };
  return (
    <>
      {contact && <ContactItem contact={contact} />}
      <button onClick={handleGoBack}>Back</button>
    </>
  );
};

export default ContactPage;
