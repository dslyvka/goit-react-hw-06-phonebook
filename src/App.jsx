import { Fragment } from 'react';
import { nanoid } from 'nanoid';

import Filter from './components/Filter/Filter';
import Form from './components/Form/Form';
import Contacts from './components/Contacts/Contacts';
import { SectionStyled } from './components/Contacts/SectionContacts.styled';

import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
  addContact,
  deleteContact,
  searchContacts,
} from './components/redux/phonebook-actions';

function App() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const { filter } = useSelector(state => state.contacts);
  const contacts = useSelector(state => state.contacts.items);
  const dispatch = useDispatch();

  const onInput = e => {
    const form = e.currentTarget.name;
    switch (form) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const onClick = e => {
    e.preventDefault();
    const id = nanoid();

    if (e.target.checkValidity()) {
      if (
        contacts.find(
          contact =>
            contact.name.toLowerCase().includes(name.toLowerCase()) &&
            contact.name.toLowerCase().length === name.length,
        )
      ) {
        alert(`${name} is already in contacts`);
        return;
      }
      dispatch(addContact({ name, id, number }));
      // Пропихиваем объект, котоорый в редьюсере будет в виде payload
    }
  };

  const filterContacts = () => {
    const contactNormalized = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(contactNormalized),
    );
    return filteredContacts;
  };

  const filteredContacts = filterContacts();
  return (
    <Fragment>
      <Form onInput={onInput} onClick={onClick}></Form>
      <SectionStyled>
        <Filter value={filter} search={searchContacts}></Filter>
        <Contacts
          contacts={filteredContacts}
          deleteContact={deleteContact}
        ></Contacts>
      </SectionStyled>
    </Fragment>
  );
}

export default App;
