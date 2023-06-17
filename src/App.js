import useLocalStorage from 'hooks/useLocaStorage';
import { useState, useEffect } from 'react';

import shortId from 'shortid';
import { Container } from './App.styled';

// import Container from 'components/Container';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import initialContacts from '../src/contacts.json';
const CONTACTS_KEY = 'contacts';

function App() {
  // const [contacts, setContacts] = useState(() =>
  //   JSON.parse(localStorage.getItem(CONTACTS_KEY) ?? initialContacts)
  // );
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const onContactFormSubmit = contactData => {
    const id = shortId.generate();
    const { name, number } = contactData;
    const newContact = { id, name, number };

    console.log(contactData);
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else setContacts(contacts => [{ ...contacts, newContact }]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
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

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onContactFormSubmit} />
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
