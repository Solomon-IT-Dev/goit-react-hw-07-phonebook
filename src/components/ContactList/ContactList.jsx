import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContactsItems, removeContact } from 'redux/contacts/slice';
import { getFilterValue } from 'redux/filter/slice';
import sortContactsByName from 'utils/sortContactsByName';
import ContactItem from 'components/ContactItem';
import {
  TotalContactsText,
  TotalContactsNum,
  PhonebookList,
  ListElement,
  NoMatchesText,
  NoContactsText,
} from './ContactList.styled';

export default function ContactList() {
  const contacts = useSelector(getContactsItems);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const totalContactsAmount = contacts.length;

  const getVisibleContacts = useMemo(
    () => () => {
      const normalizedFilter = filterValue.toLowerCase().trim();
      return contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(normalizedFilter) ||
            contact.number.includes(normalizedFilter)
        )
        .sort(sortContactsByName);
    },
    [contacts, filterValue]
  );

  const visibleContacts = getVisibleContacts();

  const onDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  return totalContactsAmount > 0 ? (
    <>
      <TotalContactsText>
        Contacts amount:{' '}
        <TotalContactsNum>{totalContactsAmount}</TotalContactsNum>
      </TotalContactsText>
      <PhonebookList>
        {visibleContacts.length ? (
          visibleContacts.map(({ id, name, number }) => (
            <ListElement key={id}>
              <ContactItem
                id={id}
                name={name}
                number={number}
                onDelete={onDeleteContact}
              />
            </ListElement>
          ))
        ) : (
          <NoMatchesText>No contact matches</NoMatchesText>
        )}
      </PhonebookList>
    </>
  ) : (
    <NoContactsText>There are no contacts in your phonebook</NoContactsText>
  );
}
