import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import ContactList from './ContactList';
import { MyLoader } from '../shared/Loader/MyLoader';
import { ContactType } from './ContactsType';

const Contacts = () => {
  const [contacts, setContacts] = React.useState<ContactType[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  useEffect(() => {
    axios
      .get<ContactType[]>('/contacts')
      .then((response) => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch((e) => {
        const error =
          e.response.status === 404
            ? 'Resource Not found'
            : 'An unexpected error has occurred';
        setError(error);
        setLoading(false);
      });
  }, []);

  const deleteContact = (id: string): void => {
    try {
      axios.delete<string>('/contacts/' + id);
      setContacts((contacts) => contacts.filter(({ _id }) => _id !== id));
    } catch (e: any) {
      const error =
        e.response.status === 404
          ? 'Resource Not found'
          : 'An unexpected error has occurred';
      setError(error);
    }
  };
  const editContact = (id: string, email: string, name: string): void => {
    try {
      axios.put<string>('/contacts/' + id);

      // setContacts((contacts) =>
      //   contacts.reduce((a, b) => {
      //     b._id === id
      //       ? a.push({ ...b, ...{ email: email, name } })
      //       : a.push(b);
      //     return a;
      //   }, [])
      // );

      setContacts((contacts) =>
        contacts.map((el) =>
          el._id === id ? Object.assign({}, el, { name, email }) : el
        )
      );
    } catch (e: any) {
      const error =
        e.response.status === 400
          ? 'missing fields'
          : 'An unexpected error has occurred';
      setError(error);
    }
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {isLoading ? (
        <MyLoader />
      ) : (
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          openModal={openModal}
        />
      )}
    </>
  );
};

export default Contacts;
