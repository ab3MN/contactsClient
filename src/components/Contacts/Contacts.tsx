import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import ContactList from './ContactList';
import { MyLoader } from '../shared/Loader/MyLoader';
import { ContactType } from './ContactsType';
import Modal from '../shared/Modal/Modal';
import FormEditor from '../shared/FormEditor/FormEditor';

const Contacts = () => {
  const [contacts, setContacts] = React.useState<ContactType[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<ContactType>();
  const [type, setType] = React.useState<string>('');

  useEffect(() => {
    axios
      .get<ContactType[]>('/contacts')
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(e => {
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
      setContacts(contacts => contacts.filter(({ _id }) => _id !== id));
    } catch (e: any) {
      const error =
        e.response.status === 404
          ? 'Resource Not found'
          : 'An unexpected error has occurred';
      setError(error);
    }
  };
  const editContact = async (
    id: string | undefined,
    email: string | undefined,
    name: string | undefined,
    phone: string | undefined,
  ): Promise<any> => {
    try {
      await axios.put<string>('/contacts/' + id, { name, email, phone });

      setContacts(contacts =>
        contacts.map(el =>
          el._id === id ? Object.assign({}, el, { email, name, phone }) : el,
        ),
      );
    } catch (e: any) {
      const error =
        e.response.status === 400
          ? 'missing fields'
          : 'An unexpected error has occurred';
      setError(error);
    }
  };
  const addContact = async (
    email: string | undefined,
    name: string | undefined,
  ): Promise<any> => {
    try {
      const res = await axios.post<ContactType>('/contacts', {
        name,
        email,
      });
      setContacts(contacts => [...contacts, res.data]);
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

  const getContactInfo = (id: string) => {
    setContact(contacts.find(({ _id }) => _id === id));
    setType('edit');
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <FormEditor
            type={type}
            onEdit={editContact}
            email={contact?.email}
            name={contact?.name}
            phone={contact?.phone}
            id={contact?._id}
            onClose={closeModal}
            onAdd={addContact}
          />
        </Modal>
      )}
      {isLoading ? (
        <MyLoader />
      ) : (
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          openModal={openModal}
          getContactInfo={getContactInfo}
        />
      )}
      <button
        type="button"
        onClick={() => {
          openModal();
          setType('add');
        }}
      >
        Add Contact
      </button>
    </>
  );
};

export default Contacts;
