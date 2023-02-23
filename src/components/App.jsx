import { useState, useEffect } from 'react';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Box } from './Box/Box';
import { nanoid } from 'nanoid';

import css from '../components/App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const items = JSON.parse(localStorage.getItem('my-contacts'));
    return items?.length ? items : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = ({ target }) => setFilter(target.value);

  const onAddContact = ({ name, number }) => {
    if (isDublicate({ name })) {
      return alert(`${name} is alraedy exist`);
    }
    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return [...prevContacts, newContact];
    });
  };

  const isDublicate = ({ name }) => {
    const normalizedName = name.toLowerCase();
    const dublicate = contacts.find(contact => {
      return contact.name.toLowerCase() === normalizedName;
    });

    return Boolean(dublicate);
  };

  const onDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.includes(normalizedFilter)
      );
    });

    return result;
  };

  const items = getFilteredContacts();

  return (
    <div className={css.wrapper}>
      <Box title="Phonebook">
        <ContactForm onSubmit={onAddContact} />
      </Box>
      <Box title="Contacts">
        <Filter filter={filter} onChange={handleChange} />
        <ContactList
          className={css.contacts}
          contacts={items}
          onDeleteContact={onDeleteContact}
        />
      </Box>
    </div>
  );
};
