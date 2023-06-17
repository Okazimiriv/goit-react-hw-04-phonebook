import { useState, useEffect } from 'react';

import shortId from 'shortid';
import { Container } from './App.styled';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Container from 'components/Container';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import initialContacts from '../src/contacts.json';

const CONTACTS_KEY = 'contacts';

function App() {
  //   state = {
  //     contacts: initialContacts,
  //     filter: '',
  //   };
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(CONTACTS_KEY)) || initialContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  //   componentDidMount() {
  //     const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
  //     if (contacts) {
  //       this.setState({ contacts: contacts });
  //     }
  //   }
  //   componentDidUpdate(prevProps, prevState) {
  //     if (this.state.contacts !== prevState.contacts) {
  //       localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
  //     }
  //   }

  const onContactFormSubmit = contactData => {
    const id = shortId.generate();
    const { name, number } = contactData;
    const newContact = { id, name, number };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      toast.warn(`${newContact.name} is already in contacts`, {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setContacts([...contacts, newContact]);
  };

  const changeFilter = event => {
    setFilter(event.target.value.toLowerCase().trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onContactFormSubmit} />
      <ToastContainer
        autoClose={3000}
        transition={Zoom}
        theme="colored"
        style={{ top: '1px' }}
      />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default App;
