import React from 'react';
import { useLocation } from 'react-router';
import axios from 'axios';
import { ContactType } from '../../../components/Contacts/ContactsType';
import ContactItem from '../../../components/Contacts/ContactItem/ContactItem';

const ContactPage = () => {
  const location = useLocation();
  const [contact, setContact] = React.useState<ContactType>();
  const id = location.pathname.split('/')[2];

  React.useEffect(() => {
    axios.get<ContactType>('/contacts/' + id).then(res => {
      setContact(res.data);
    });
  }, [id]);

  const uploadImg = async (file: any) => {
    const formData = new FormData();
    formData.append('avatar', file);
    file &&
      (await axios
        .patch<ContactType>('/contacts/' + id + '/avatar', formData, {})
        .then(res => setContact(res.data))
        .catch(e => console.log(e)));
  };

  return (
    <>{contact && <ContactItem contact={contact} uploadImg={uploadImg} />}</>
  );
};

export default ContactPage;
