import axios from 'axios';
import React, { ReactHTML } from 'react';
import { useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import { MyLoader } from '../shared/Loader/MyLoader';
import { ContactType, IContactToEditForm } from './ContactsType';

import Modal from '../shared/Modal/Modal';
import FormEditor from '../shared/FormEditor/FormEditor';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Contacts = () => {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  /* ==================== GET   ==================== */
  const [contacts, setContacts] = React.useState<ContactType[]>([]);
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
      })
      .finally(() => setLoading(false));
  }, []);

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
      setError(error);
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
      setError(error);
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
      setError(error);
    }
  };

  /* ==================== MODAL   ==================== */
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const openModal = () => setModalOpen(true);
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

  const filtredContacts = contacts.filter(
    el =>
      el.email.toLowerCase().includes(contactFilter.toLowerCase()) ||
      el.name.toLowerCase().includes(contactFilter.toLowerCase()),
  );

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContactFilter(e.target.value);

  const _handleChangeFilter = React.useCallback(handleChangeFilter, []);

  const [iconColor, setIconColor] = React.useState('white');
  return (
    <section>
      <IconButton
        onClick={() => {
          openModal();
          setType('add');
        }}
        sx={{
          color: '#ffffff',
          display: 'block',
          '&:hover': {
            color: 'rgb(3, 233, 244)',
          },
          top: -65,
          m: '0 auto',
        }}
      >
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>

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
          onFocus={() => setIconColor('rgb(3, 233, 244)')}
          onBlur={() => setIconColor('white')}
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
          openModal={openModal}
          getContactInfo={getContactInfo}
        />
      )}
    </section>
  );
};

export default Contacts;
