import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { Box } from './Box/Box';
import { nanoid } from 'nanoid';

import css from '../components/App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts.length !== prevState.contacts.length) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onAddContact = ({ name, number }) => {
    if (this.isDublicate({ name })) {
      return alert(`${name} is alraedy exist`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { contacts: [...contacts, newContact] };
    });
  };

  isDublicate({ name }) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();

    const dublicate = contacts.find(contact => {
      return contact.name.toLowerCase() === normalizedName;
    });

    return Boolean(dublicate);
  }

  onDeleteContact = id => {
    this.setState(prevState => {
      const newContacts = prevState.contacts.filter(
        contact => contact.id !== id
      );

      return {
        contacts: newContacts,
      };
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
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

  render() {
    const contacts = this.getFilteredContacts();

    return (
      <div className={css.wrapper}>
        <Box title="Phonebook">
          <ContactForm onSubmit={this.onAddContact} />
        </Box>
        <Box title="Contacts">
          <Filter filter={this.state.filter} onChange={this.handleChange} />
          <ContactList
            className={css.contacts}
            contacts={contacts}
            onDeleteContact={this.onDeleteContact}
          />
        </Box>
      </div>
    );
  }
}
