import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastifyOptions } from 'options/toastifyOptions';

import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import Filter from './Filter/Filter';

import useLocalStorage from 'customHook/useLocalStorage';
import initialContacts from 'data/contacts.json';
import { nanoid } from 'nanoid';

export default function App() {
  // state = {
  //   contacts: initialContacts,
  //   filter: '',
  // };

  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts);
  const [filter, setFilter] = useState('');

  // componentDidMount() {
  //   const contactFromLs = localStorage.getItem('contacts');
  //   const parcedContacts = JSON.parse(contactFromLs);
  //   if (parcedContacts) {
  //     this.setState({ contacts: parcedContacts });
  //   }
  // }

  const addContact = newContact => {
    contacts.some(
      ({ name, number }) =>
        name.toLowerCase().trim() === newContact.name.toLowerCase().trim() ||
        number.trim() === newContact.number.trim()
    )
      ? toast.error(
          `${newContact.name}: is already in contacts`,
          toastifyOptions
        )
      : setContacts(contacts => [...contacts, { ...newContact, id: nanoid() }]);
  };

  const deleteContact = contactId => {
    // this.setState(prevState => {
    //   return {
    //     contacts: prevState.contacts.filter(
    //       contact => contact.id !== contactId
    //     ),
    //   };
    // });
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    // this.setState({ filter: e.currentTarget.value.toLowerCase() });
    setFilter(e.currentTarget.value.toLowerCase().trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
    if (normalizedFilter && !filtered.length) {
      toast.warn(`No contacts matching your request`, toastifyOptions);
    }
    return filtered;
  };

  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm onAddContact={addContact} />
        <Header title="Contacts" />
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
      </Section>
      <ToastContainer />
      <GlobalStyle />
    </Layout>
  );
}
