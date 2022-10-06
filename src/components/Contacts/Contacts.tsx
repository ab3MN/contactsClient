import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import { MyLoader } from '../shared/Loader/MyLoader';
import { ContactType, IContactToEditForm } from './ContactsType';

import Modal from '../shared/Modal/Modal';
import FormEditor from '../shared/FormEditor/FormEditor';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddButton from '../shared/Buttons/AddButton/AddButton';
import { useTypedSelector } from '../../hooks/useTypedSelectors';

const Contacts = () => {
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const { isAuthenticated } = useTypedSelector(s => s.user);

  /* ==================== GET   ==================== */
  const [contacts, setContacts] = React.useState<ContactType[]>([]);
  useEffect(() => {
    isAuthenticated &&
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
          console.log(error);
        })
        .finally(() => setLoading(false));
  }, [isAuthenticated]);

  /* ==================== DELETE  ==================== */
  const deleteContact = (id: string): void => {
    try {
      axios.delete<string>('/contacts/' + id);
      setContacts(contacts => contacts.filter(({ _id }) => _id !== id));
    } catch (e: any) {
      const error =
        e.response.status === 404
          ? 'Resource Not found'
          : 'An unexpected error has occurred';
      console.log(error);
    }
  };
  /* ==================== EDIT  ==================== */
  const [contact, setContact] = React.useState<ContactType>();
  const [type, setType] = React.useState<string>('');

  const editContact = async (
    id: string,
    contact: IContactToEditForm,
  ): Promise<any> => {
    try {
      const { name, email, phone } = contact;
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
      console.log(error);
    }
  };
  /* ==================== ADD  ==================== */
  const addContact = async (
    email: string,
    name: string,
    phone?: string,
  ): Promise<any> => {
    try {
      const res = await axios.post<ContactType>('/contacts', {
        name,
        email,
        phone,
      });
      setContacts(contacts => [...contacts, res.data]);
    } catch (e: any) {
      const error =
        e.response.status === 400
          ? 'missing fields'
          : 'An unexpected error has occurred';
      console.log(error);
    }
  };

  /* ==================== MODAL   ==================== */
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = () => setModalOpen(true);
  const _openModal = React.useCallback(openModal, []);

  const closeModal = () => {
    setModalOpen(false);
    setContact({
      _id: '',
      email: '',
      name: '',
      favorite: false,
      smallAvatarURL: '',
      largeAvatarURL: '',
      phone: '',
    });
  };

  const getContactInfo = (id: string) => {
    setContact(contacts.find(({ _id }) => _id === id));
    setType('edit');
  };

  /* ==================== FILTER   ==================== */
  const [contactFilter, setContactFilter] = React.useState<string>('');

  const filtredContacts = React.useMemo(
    () =>
      contacts.filter(
        el =>
          el.email.toLowerCase().includes(contactFilter.toLowerCase()) ||
          el.name.toLowerCase().includes(contactFilter.toLowerCase()),
      ),
    [contacts, contactFilter],
  );

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContactFilter(e.target.value);

  const _handleChangeFilter = React.useCallback(handleChangeFilter, []);

  let iconColor = 'white';

  return (
    <section>
      <AddButton
        openModal={_openModal}
        changeType={setType}
        type="add"
        style={{
          top: -65,
          m: '0 auto',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 700,
          m: '10px auto',
        }}
      >
        <SearchIcon sx={{ color: iconColor, mr: 1, mt: 2 }} fontSize="large" />
        <TextField
          id="input-find-contact"
          label="Find Contact"
          variant="standard"
          value={contactFilter}
          onChange={_handleChangeFilter}
          onFocus={() => (iconColor = 'rgb(3, 233, 244')}
          onBlur={() => (iconColor = 'white')}
          sx={{
            input: {
              color: 'white',
              width: '700px',
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
          }}
        />
      </Box>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {contact ? (
            /* ==================== EDIT ==================== */
            <FormEditor
              type={type}
              contact={contact}
              onEdit={editContact}
              id={contact._id}
              onClose={closeModal}
              onAdd={addContact}
            />
          ) : (
            /* ==================== ADD ==================== */
            <FormEditor
              id={''}
              type={type}
              onEdit={editContact}
              onClose={closeModal}
              onAdd={addContact}
            />
          )}
        </Modal>
      )}

      {/* ==================== CONTACT LIST ==================== */}
      {isLoading ? (
        <MyLoader />
      ) : (
        <ContactList
          contacts={filtredContacts}
          deleteContact={deleteContact}
          openModal={_openModal}
          getContactInfo={getContactInfo}
        />
      )}
    </section>
  );
};

export default Contacts;
