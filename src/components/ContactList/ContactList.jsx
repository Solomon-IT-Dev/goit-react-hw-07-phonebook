import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/filter/slice';
import { useGetAllContactsQuery } from 'services/phoneBookApi';
import sortContactsByName from 'utils/sortContactsByName';
import ContactItem from 'components/ContactItem';
import { FaRedo } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import {
  TotalContactsText,
  TotalContactsNum,
  PhonebookList,
  ListElement,
  LoaderItem,
  NoMatchesText,
  NoContactsText,
  FetchErrorText,
  RefetchBtn,
} from './ContactList.styled';

export default function ContactList() {
  const {
    data: contacts,
    isLoading,
    isError,
    refetch,
  } = useGetAllContactsQuery();

  const filterValue = useSelector(getFilterValue);

  const totalContactsAmount = () => {
    if (!contacts) {
      return 0;
    }
    return contacts.length;
  };

  const getVisibleContacts = useMemo(
    () => () => {
      if (!contacts) {
        return;
      }

      const normalizedFilter = filterValue.toLowerCase().trim();

      return contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(normalizedFilter) ||
            contact.phone.includes(normalizedFilter)
        )
        .sort(sortContactsByName);
    },
    [contacts, filterValue]
  );

  const visibleContacts = getVisibleContacts();

  return (
    <>
      {isLoading ? (
        <LoaderItem>Loading...</LoaderItem>
      ) : totalContactsAmount() > 0 ? (
        <>
          <TotalContactsText>
            Contacts amount:{' '}
            <TotalContactsNum>{totalContactsAmount()}</TotalContactsNum>
          </TotalContactsText>
          <PhonebookList>
            {visibleContacts.length ? (
              visibleContacts.map(({ id, name, phone }) => (
                <ListElement key={id}>
                  <ContactItem id={id} name={name} phone={phone} />
                </ListElement>
              ))
            ) : (
              <NoMatchesText>No contact matches</NoMatchesText>
            )}
          </PhonebookList>
        </>
      ) : (
        <>
          <NoContactsText>
            There are no contacts in your phonebook
          </NoContactsText>
        </>
      )}
      {isError && (
        <>
          <FetchErrorText>Fetch error! Refetch contacts</FetchErrorText>
          <RefetchBtn type="button" onClick={() => refetch()}>
            <IconContext.Provider value={{ size: '5em' }}>
              <FaRedo />
            </IconContext.Provider>
          </RefetchBtn>
        </>
      )}
    </>
  );
}
